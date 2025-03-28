<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import RecipeFormFields from '@/components/RecipeFormFields.vue'
import { useUserStore } from '@/stores/user-store.ts'
import { useRecipesStore } from '@/stores/recipes-store.ts'
import { getLastRecipeId, getRecipe, postRecipe, putRecipe } from '@/services/api-Recipe-Service.ts'
import type { Recipe } from '@/types/Recipe.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const recipesStore = useRecipesStore()

const props = defineProps<{ id?: string }>() // id is undefined in create mode

// Determine mode
const isEditMode = computed(() => !!props.id)

onMounted(async () => {
  if (isEditMode.value && props.id) {
    formData.value = await getRecipe(props.id)
  }
})

const errors = ref<{ [key: string]: string }>({})

const formData = ref<Recipe>({
  id: '',
  owner: '',
  name: '',
  description: '',
  ingredients: [{ name: '', quantity: 0, unit: '' }], // Start with one empty ingredient
  instructions: [''] // Start with one empty instruction
})

const createRecipe = async () => {
  try {
    if (!isEditMode.value) {
      const last_id = await getLastRecipeId()
      const new_id: number = last_id !== null ? Number(last_id) + 1 : 1

      formData.value.id = String(new_id)
    }

    if (userStore.user) {
      // Ensures `user` exists before accessing `id`
      formData.value.owner = userStore.user.id
    } else {
      console.warn('User is not logged in or data is not loaded yet.')
    }

    // check form validation
    if (validateForm()) {
      // submit to backend
      if (isEditMode.value) {
        await putRecipe(formData.value)
      } else {
        await postRecipe(formData.value)
      }

      recipesStore.updateRecipe(formData.value) // update local store
      await router.push({ name: 'recipeDetails', params: { id: formData.value.id } })
    } else {
      console.warn('Fix form errors', errors.value)
    }
  } catch (err) {
    console.error('Error posting recipe:', err)
  }
}

const validateForm = () => {
  errors.value = {} // reset errors
  // Name validation
  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required'
  }

  // Description validation
  if (!formData.value.description.trim()) {
    errors.value.description = 'Description is required'
  }

  // Ingredients validation
  if (formData.value.ingredients.length === 0) {
    errors.value.ingredients = 'At least one ingredient is required'
  }

  for (let i = 0; i < formData.value.ingredients.length; i++) {
    const ingredient = formData.value.ingredients[i]
    if (!ingredient.name.trim()) {
      errors.value[`ingredient-${i + 1} name`] = 'Ingredient name is required'
    }
    if (!isFinite(ingredient.quantity) || isNaN(Number(ingredient.quantity))) {
      errors.value[`ingredient-${i + 1} quantity`] = 'Ingredient quantity is required'
    }
    if (!ingredient.unit.trim()) {
      errors.value[`ingredient-${i + 1} unit`] = 'Ingredient unit is required'
    }
  }

  // Instructions validation
  if (formData.value.instructions.length === 0) {
    errors.value.instructions = 'At least one instruction is required'
  }

  for (let i = 0; i < formData.value.instructions.length; i++) {
    const instruction = formData.value.instructions[i]
    if (!instruction.trim()) {
      errors.value[`instruction-${i + 1}`] = 'Instruction is required'
    }
  }

  return Object.keys(errors.value).length === 0 // is valid?
}

const addIngredient = () => {
  formData.value.ingredients.push({ name: '', quantity: 0, unit: '' })
}

const addInstruction = () => {
  formData.value.instructions.push('')
}

const remove = <T,>(arr: T[], index: number) => {
  if (arr.length > 1) {
    arr.splice(index, 1)
  }
}
</script>

<template>
  <form @submit.prevent="createRecipe" id="create-wrapper">
    <label for="recipe-name">Назва:</label>
    <input
      id="recipe-name"
      v-model.trim="formData.name"
      type="text"
      @keydown.enter.prevent
      required
    />
    <label for="recipe-description">Опис страви:</label>
    <textarea
      id="recipe-description"
      v-model.trim="formData.description"
      rows="5"
      cols="1"
      required
    ></textarea>

    <hr />

    Інгредієнти:
    <ol class="recipe-list">
      <li v-for="(_, index) in formData.ingredients" :key="index" class="recipe-ingredient">
        <button type="button" class="control-button" @click="remove(formData.ingredients, index)">
          Видалити
        </button>
        <RecipeFormFields v-model="formData.ingredients[index]" type="ingredients" :index="index" />
      </li>
    </ol>
    <button type="button" class="control-button" @click="addIngredient">Додати інгредієнт</button>

    <hr />

    Інструкції:
    <ol class="recipe-list">
      <li v-for="(_, index) in formData.instructions" :key="index">
        <button type="button" class="control-button" @click="remove(formData.instructions, index)">
          Видалити
        </button>
        <RecipeFormFields
          v-model="formData.instructions[index]"
          type="instructions"
          :index="index"
        />
      </li>
    </ol>
    <button type="button" class="control-button" @click="addInstruction">
      Додати наступний крок
    </button>

    <hr />

    <input type="submit" class="submit-button" value="Зберегти рецепт" />
  </form>
</template>

<style scoped>
#create-wrapper {
  display: flex;
  flex-direction: column;
  margin: 2vw;
  padding: 1vw;
}

#recipe-description {
  resize: none;
}

/* Adds space between list items */
.recipe-list {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Adjust as needed */
}

/* Add a border and padding around each ingredient item */
.recipe-ingredient {
  width: fit-content; /* Ensures the width is only as wide as its content */
  border: 2px solid #ddd; /* Light gray border */
  border-radius: 8px; /* Rounded corners */
  padding: 10px; /* Space inside the box */
}

.submit-button {
  background-color: #bfffa5;
  width: 10vw;
  min-width: fit-content;
  white-space: nowrap;
  border: none;
  border-radius: 8px 8px 8px 8px;
  cursor: pointer;
  align-self: center;
}

hr {
  /* to prevent hr corrupting in flex */
  margin-left: 0;
  margin-right: 0;
}
</style>
