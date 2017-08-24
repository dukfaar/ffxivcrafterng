import { ProjectStockEntry } from './project-stock-entry.type'
import { Step } from './step.type'

export interface Project {
  _id: string
  name: string
  comment: string
  notes: string
  order: boolean
  private: boolean
  public: boolean
  price: number
  state: string
  tree: Step
  hiddenOnOverviewBy: string[]
  stock: ProjectStockEntry[]
  creator: number
}
