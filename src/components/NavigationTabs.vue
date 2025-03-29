<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user-store.ts'

const userStore = useUserStore()

const path_name = computed(() => {
  const tabs = [
    { path: 'home', name: 'Home' } // always shown
  ]

  if (userStore.isAuthenticated()) {
    tabs.push({ path: 'mybook', name: 'My Book' }, { path: 'settings', name: 'Settings' })
  } else {
    tabs.push({ path: 'login', name: 'Login' })
  }

  return tabs
})

const active_Tab = ref<number | null>(null)

const route = useRoute()

// Update the selected NavTab when the route.name changes
watch(
  () => route.name,
  () => {
    select_Tab(path_name.value.findIndex((item) => item.path === route.name))
  }
)

const select_Tab = (index: number) => {
  active_Tab.value = index
}
</script>

<template>
  <div id="navigation-wrapper">
    <RouterLink v-for="(tab, index) in path_name" :key="index" :to="{ name: tab.path }">
      <button
        class="navigation-button"
        :class="{ active: active_Tab === index }"
        @click="select_Tab(index)"
      >
        {{ tab.name }}
      </button>
    </RouterLink>
  </div>
</template>

<style scoped>
#navigation-wrapper {
  grid-column-start: 2;
  grid-row-start: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2%;
}

.navigation-button {
  background-color: #ecc198;
  width: 15vw;
  min-width: fit-content;
  white-space: nowrap;
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
}

.navigation-button:hover {
  opacity: 0.85;
}

.navigation-button:active {
  /* Scaling button to 0.98 to its original size */
  transform: scale(0.98);
  /* Lowering the shadow */
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}

.navigation-button.active {
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
