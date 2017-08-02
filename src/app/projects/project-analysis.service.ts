import { Injectable } from '@angular/core'

import { Project } from './project.type'
import { ProjectAnalysisData } from './project-analysis-data.type'
import { GatherListEntry } from './gatherlist-entry.type'
import { BuyListEntry } from './buylist-entry.type'

import { Step } from './step.type'
import { CraftableStep } from './craftable-step.type'

import * as _ from 'lodash'

@Injectable()
export class ProjectAnalysisService {
  private analyzeStep(step: Step, analysisData: ProjectAnalysisData): void {
    switch(step.step) {
      case 'Gather': this.gatheringStep(step, analysisData)
      case 'Craft': this.craftingStep(step, analysisData)
      case 'Buy': this.buyingStep(step, analysisData)
      case 'Meta': this.metaStep(step, analysisData)
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

  function craftingStep (step: Step, analysisData: ProjectAnalysisData) {
    var stepData = getMaxCraftableSteps(step, analysisData)

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
          var stepInput = findInputByItem(step.inputs, input.item)
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
      this.deductFromUnallocatedStock(step.item._id, step.amount, step.hq)
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

    analysisData.revenue = this.stepPrice(project.tree)
    analysisData.profit = analysisData.revenue * 0.95 - analysisData.totalCost
    analysisData.relativeProfit = (analysisData.profit / analysisData.totalCost) * 100

    console.log(analysisData)
    return analysisData
  }
}
