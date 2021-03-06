import { Item } from '../item/item.type'
import { Recipe } from '../recipe/recipe.type'
import { UserModel } from '../user/user.type'

type StepType = 'Meta' | 'Gather' | 'Craft' | 'Buy'

export class Step {
  _id: string
  step: StepType
  amount: number
  hq: boolean
  inputs: Step[]
  item: Item
  recipe: Recipe
  workedOnBy: UserModel[]
}
