interface Ingredient {
  name: string
  quantity: number
  quantity_max?: number // Optional property
  unit: string
}

interface Recipe {
  id: string
  owner: string
  name: string
  description: string
  ingredients: Array<Ingredient>
  instructions: Array<string>
}

// to prevent error:
// Vue: An 'export default' must reference a value when 'verbatimModuleSyntax' is enabled, but 'Recipe' only refers to a type.
// with export default Recipe;
// use correct export:
export type { Ingredient, Recipe }
