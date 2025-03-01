<script setup lang="ts">
enum template_type {
  ingredients = 'ingredients',
  instructions = 'instructions'
}

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})
</script>

<template>
  <template v-if="props.type === template_type.ingredients">
    Інгредієнт:
    <input class="recipe-ingredients" name="ingredients" type="text" />
    Кількість: Максимальна кількість: Одиинця:
  </template>

  <template v-if="props.type === template_type.instructions">
    Крок:
    <textarea class="recipe-instructions" name="instructions" type="text" rows="1" cols="30" />
  </template>
</template>

<style scoped>
.recipe-instructions {
  resize: none;
}
</style>
