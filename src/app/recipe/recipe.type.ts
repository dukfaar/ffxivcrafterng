type JobType = 'Armorer' | 'Alchemist' | 'Blacksmith' | 'Carpenter' | 'Weaver' | 'Leatherworker' | 'Goldsmith' | 'Culinarian'

interface RecipeInOutType {
  item: string
  amount: number
}

export class Recipe {
  _id: string
  craftingJob: JobType
  craftingLevel: number
  inputs: RecipeInOutType[]
  outputs: RecipeInOutType[]
}
