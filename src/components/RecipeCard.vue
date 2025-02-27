<script setup lang="ts">
defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink class="recipe-link" :to="{ name: 'recipeDetails', params: { id: recipe.id } }">
    <div class="recipe-card">
      <span class="recipe-item">{{ recipe.name }}</span>
      <span class="recipe-item">{{ recipe.description }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.recipe-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vw;
  padding: 1vw;
  border-style: dashed;
  border-width: thin;
}

.recipe-card:hover {
  opacity: 0.7;
}

.recipe-card:active {
  /* Scaling button to 0.98 to its original size */
  transform: scale(0.98);
  /* Lowering the shadow */
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}

.recipe-link {
  color: inherit;
  text-decoration: none;
}
</style>
