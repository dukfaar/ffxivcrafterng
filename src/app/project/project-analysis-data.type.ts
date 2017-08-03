import { Project } from './project.type'
import { ProjectStockEntry } from './project-stock-entry.type'
import { Step } from './step.type'
import { CraftableStep } from './craftable-step.type'

import { GatherListEntry } from './gatherlist-entry.type'
import { BuyListEntry } from './buylist-entry.type'

import * as _ from 'lodash'

export class ProjectAnalysisData {
  project: Project
  stockRequirements: {[item: string]: Step[]} = {}
  gatherList: {[item: string]: GatherListEntry} = {}
  gatherListArray: GatherListEntry[] = []
  stepData: {}
  buyList: {[item: string]: BuyListEntry} = {}
  buyListArray: BuyListEntry[] = []
  craftableSteps: CraftableStep[] = []
  craftableStepsList: CraftableStep[] = []
  unallocatedStock: ProjectStockEntry[] = []
  totalCost: number
  revenue: number
  profit: number
  relativeProfit: number

  public findItemInStock(itemId: string, hq: boolean) {
    return _.find(this.unallocatedStock, s => s.item._id === itemId && s.hq === hq)
  }

  public getItemAmountInStock(itemId: string, hq: boolean) {
    let item = this.findItemInStock(itemId, hq)

    return item ? item.amount : null
  }

  public deductFromUnallocatedStock(itemId: string, amount: number, hq: boolean) {
    let item = this.findItemInStock(itemId, hq)

    if (item) item.amount -= amount
  }

  public markStockAsRequiredBy(itemId: string, hq: boolean, requiredByStep: Step) {
    if (!this.stockRequirements[itemId + '_' + hq]) this.stockRequirements[itemId + '_' + hq] = []
    this.stockRequirements[itemId + '_' + hq].push(requiredByStep)
  }

  constructor(project: Project) {
    this.project = project
    this.unallocatedStock = _.extend([], project.stock)
  }
}
