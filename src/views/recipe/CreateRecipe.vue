<script setup lang="ts">
import { ref } from 'vue'
import RecipeCreateForm from '@/components/RecipeCreateForm.vue'
import { useUserStore } from '@/stores/user-store.ts'
import { getLastRecipeId, postRecipe } from '@/services/api-Recipe-Service.ts'
import type { Recipe } from '@/types/Recipe.ts'
import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()

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
    const last_id = await getLastRecipeId()
    const new_id: number = last_id !== null ? Number(last_id) + 1 : 1

    formData.value.id = String(new_id)
    if (userStore.user) {
      // Ensures `user` exists before accessing `id`
      formData.value.owner = userStore.user.id
    } else {
      console.warn('User is not logged in or data is not loaded yet.')
    }

    await postRecipe(formData.value)

    await router.push({ name: 'recipeDetails', params: { id: formData.value.id } })
  } catch (err) {
    console.error('Error posting recipe:', err)
  }
}

const addIngredient = () => {
  formData.value.ingredients.push({ name: '', quantity: 0, unit: '' })
}

const addInstruction = () => {
  formData.value.instructions.push('')
}
</script>

<template>
  <form @submit.prevent="createRecipe" id="create-wrapper">
    <label for="recipe-name">Назва:</label>
    <input id="recipe-name" v-model.trim="formData.name" type="text" @keydown.enter.prevent />
    <label for="recipe-description">Опис страви:</label>
    <textarea
      id="recipe-description"
      v-model.trim="formData.description"
      rows="5"
      cols="1"
    ></textarea>
    Інгредієнти:
    <ol class="recipe-list">
      <li v-for="(_, index) in formData.ingredients" :key="index" class="recipe-ingredient">
        <RecipeCreateForm v-model="formData.ingredients[index]" type="ingredients" />
      </li>
    </ol>
    <button type="button" @click="addIngredient">Додати інгредієнт</button>
    Інструкції:
    <ol class="recipe-list">
      <li v-for="(_, index) in formData.instructions" :key="index">
        <RecipeCreateForm v-model="formData.instructions[index]" type="instructions" />
      </li>
    </ol>
    <button type="button" @click="addInstruction">Додати наступний крок</button>

    <input type="submit" value="Створити рецепт" />
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
</style>
