import { Injectable } from '@angular/core'

import { Project } from './project.type'
import { ProjectAnalysisData } from './project-analysis-data.type'
import { GatherListEntry } from './gatherlist-entry.type'
import { BuyListEntry } from './buylist-entry.type'

import { Step } from './step.type'
import { CraftableStep } from './craftable-step.type'

import * as _ from 'lodash'

import { StepData } from './step-data.type'

@Injectable()
export class ProjectAnalysisService {
  private analyzeStep(step: Step, analysisData: ProjectAnalysisData): void {
    switch(step.step) {
      case 'Gather': this.gatheringStep(step, analysisData); return;
      case 'Craft': this.craftingStep(step, analysisData); return;
      case 'Buy': this.buyingStep(step, analysisData); return;
      case 'Meta': this.metaStep(step, analysisData); return;
    }
  }

  private itemPrice(step: Step): number {
    if (!step.item) return 0
    return step.step !== 'Meta' ? (step.hq ? step.item.priceHQ : step.item.price) : 0
  }

  private stepPrice(step: Step): number {
    if (step.step === 'Meta') {
      return _.reduce(step.inputs, (sum, input) => sum + this.stepPrice(input), 0)
    } else {
      return this.itemPrice(step) * step.amount
    }
  }

  private stepLookup(step: Step): string {
    return step.item._id + (step.hq ? 'HQ' : 'NQ')
  }

  private getGatherListEntry(step: Step, analysisData: ProjectAnalysisData): GatherListEntry {
    var lookup = this.stepLookup(step)

    if (!analysisData.gatherList[lookup]) {
      analysisData.gatherList[lookup] = {
        item: step.item,
        outstanding: 0,
        hq: step.hq ? true : false,
        step: step
      }
    }

    return analysisData.gatherList[lookup]
  }

   private getBuyListEntry(step: Step, analysisData: ProjectAnalysisData): BuyListEntry {
    var lookup = this.stepLookup(step)

    if (!analysisData.buyList[lookup]) {
      analysisData.buyList[lookup] = {
        item: step.item,
        outstanding: 0,
        hq: step.hq ? true : false,
        step: step
      }
    }

    return analysisData.buyList[lookup]
  }

  private getMaxCraftableSteps(step: Step, analysisData: ProjectAnalysisData): StepData {
    let result = new StepData()

    result.amountDone = analysisData.getItemAmountInStock(step.item._id, step.hq)
    result.neededAmount = step.amount - result.amountDone

    result.neededSteps = Math.ceil(result.neededAmount / step.recipe.outputs[0].amount) // how often we need to craft the recipe to fulfill the need
    result.maxSteps = result.neededSteps // how often we can craft the recipe, with our input materials

    result.neededInputs = {}
    result.availableInputs = {}
    result.neededItems = {}

    step.recipe.inputs.forEach((input) => {
      var neededItems = input.amount * result.neededSteps

      var itemsInStock = analysisData.getItemAmountInStock(input.item, this.findInputByItem(step.inputs, input.item).hq) // 50
      var remainingNeeded = Math.max(0, neededItems - itemsInStock)

      var possibleSteps = itemsInStock > 0 ? itemsInStock / input.amount : 0

      result.neededItems[input.item] = neededItems
      result.availableInputs[input.item] = itemsInStock
      result.neededInputs[input.item] = remainingNeeded
      result.maxSteps = Math.min(result.maxSteps, possibleSteps)
    })

    return result
  }

  private findInputByItem(inputs: Step[], itemId: string) {
    return _.find(inputs, (input) => { return input.item._id === itemId })
  }

  private craftingStep(step: Step, analysisData: ProjectAnalysisData) {
    let stepData: StepData = this.getMaxCraftableSteps(step, analysisData)

    if (stepData.neededAmount > 0) {
      // we need to craft

      if (stepData.maxSteps > 0) {
        // and we can craft at least a few things

        // create a crafting step
        analysisData.craftableSteps.push({
          step: {
            amount: stepData.maxSteps * step.recipe.outputs[0].amount,
            item: step.item,
            recipe: step.recipe,
            inputs: _.extend({}, step.inputs),
            hq: step.hq,
            step: step
          }
        } as CraftableStep)

        // and remove every item that would be used in this crafting steps
        _.each(step.recipe.inputs,(input) => {
          var stepInput = this.findInputByItem(step.inputs, input.item)
          analysisData.markStockAsRequiredBy(input.item, stepInput.hq, step)
          analysisData.deductFromUnallocatedStock(input.item, Math.min(stepData.availableInputs[input.item],stepData.neededItems[input.item]) /*input.amount * stepData.maxSteps*/, stepInput.hq)
        })
      } else {
        // we still need to allocate any items that COULD be used
        _.each(step.inputs, (input: Step) => {
          analysisData.markStockAsRequiredBy(input.item._id, input.hq, step)
          var itemsInStock = analysisData.getItemAmountInStock(input.item._id, input.hq)
          var amount = Math.min(itemsInStock, stepData.neededItems[input.item._id])
          analysisData.deductFromUnallocatedStock(input.item._id, amount, input.hq)
        })
      }

      _.each(step.inputs, (input: Step) => {
        input.amount = stepData.neededInputs[input.item._id]
        this.analyzeStep(input, analysisData)
      })
    } else {
      /*
      no crafting needed
      deduce this steps items from the stock and be done
      */
      analysisData.deductFromUnallocatedStock(step.item._id, step.amount, step.hq)
    }
  }

  private metaStep(step: Step, analysisData: ProjectAnalysisData): void {
    _.each(step.inputs, (input) => {
      if (input.step !== 'Meta') {
        let inStock: number = analysisData.getItemAmountInStock(input.item._id, input.hq)
        let takeFromStock: number = Math.min(inStock, input.amount)

        input.amount -= takeFromStock

        analysisData.deductFromUnallocatedStock(input.item._id, takeFromStock, input.hq)
      }

       this.analyzeStep(input, analysisData)
    })
  }

  private buyingStep (step: Step, analysisData: ProjectAnalysisData): void {
    this.getGatherListEntry(step, analysisData).outstanding += step.amount
    this.getBuyListEntry(step, analysisData).outstanding += step.amount

    analysisData.totalCost += this.stepPrice(step)
  }

  private gatheringStep(step: Step, analysisData: ProjectAnalysisData): void {
    this.getGatherListEntry(step, analysisData).outstanding += step.amount
  }

  analyseProject(project: Project): ProjectAnalysisData {
    let analysisData = new ProjectAnalysisData(project)

    this.analyzeStep(project.tree, analysisData)

    analysisData.craftableStepsList = _.filter(analysisData.craftableSteps, e => e.step.amount >= 1)
    analysisData.gatherListArray = _.filter(_.values(analysisData.gatherList), e => e.outstanding >= 1)
    analysisData.buyListArray = _.filter(_.values(analysisData.buyList), e => e.outstanding >= 1)

    analysisData.revenue = this.stepPrice(project.tree)
    analysisData.profit = analysisData.revenue * 0.95 - analysisData.totalCost
    analysisData.relativeProfit = (analysisData.profit / analysisData.totalCost) * 100

    return analysisData
  }
}
