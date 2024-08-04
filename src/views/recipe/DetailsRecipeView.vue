<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes-store.js'
import { getRecipe } from '@/services/api-Recipe-Service.js'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useRecipesStore()

const recipe = ref(null)

const id = computed(() => props.id)

const find_in_store = () => {
  recipe.value = store.recipes.find((r) => r.id === id.value)
}

const fetch_recipe = async () => {
  try {
    recipe.value = await getRecipe(id.value)
    //TODO: add new recipe to local store
  } catch (err) {
    store.fetch_error = err
  }
}

onMounted(() => {
  // search in Pinia store
  find_in_store()
  // fetch from DB
  if (recipe.value === null || recipe.value === undefined) {
    fetch_recipe()
  }
})
</script>

<template>
  <div v-if="recipe" id="recipe-wrapper">
    <span id="recipe-title">{{ recipe.name }}</span>
    <span class="recipe-ingredients" v-for="ingredient in recipe.ingredients" :key="ingredient.name"
      >{{ ingredient.name }}: {{ ingredient.quantity }} {{ ingredient.unit }}</span
    >
    <br />
    <span
      class="recipe-instructions"
      v-for="instruction in recipe.instructions"
      :key="instruction.index"
    >
      {{ instruction }}</span
    >
    <br /><br />
  </div>
  <div v-else>Recipe is not found...</div>
</template>

<style scoped>
#recipe-wrapper {
  display: flex;
  flex-direction: column;
  margin: 2vw;
  padding: 1vw;
}

#recipe-title {
  align-self: center;
}
</style>
