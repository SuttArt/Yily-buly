<script setup lang="ts">
import { ref, type Ref } from 'vue'
import RecipeCreateForm from '@/components/RecipeCreateForm.vue'

const createRecipe = async () => {
  console.log('create recipe')
}

const ingredients_count = ref(1)
const instructions_count = ref(1)
</script>

<template>
  <form @submit.prevent="createRecipe" id="create-wrapper">
    <label for="recipe-name">Назва:</label>
    <input id="recipe-name" name="name" type="text" />
    <label for="recipe-description">Опис страви:</label>
    <textarea id="recipe-description" name="description" rows="5" cols="1"></textarea>
    Інгредієнти:
    <ol>
      <li v-for="index in ingredients_count" :key="index">
        <RecipeCreateForm type="ingredients" />
      </li>
      <button @click="ingredients_count++">+</button>
    </ol>
    Інструкції:
    <ol>
      <li v-for="index in instructions_count" :key="index">
        <RecipeCreateForm type="instructions" />
      </li>
      <button @click="instructions_count++">+</button>
    </ol>
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
</style>
