<script setup lang="ts">
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <label for="search">Пошук:</label>
  <input
    type="text"
    id="search"
    placeholder="Введіть назву рецепту..."
    :value="props.modelValue"
    @input="onInput"
  />
</template>

<style scoped></style>
