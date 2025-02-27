<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationTabs from '@/components/NavigationTabs.vue'
</script>

<template>
  <Navigation-tabs
    :path_name="[
      { path: 'home', name: 'Home' },
      { path: 'mybook', name: 'My Book' },
      { path: 'search', name: 'Search' },
      { path: 'settings', name: 'Settings' }
    ]"
  />
  <div id="content-wrapper">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
#content-wrapper {
  grid-column-start: 2;
  grid-row-start: 2;
  background-color: #faede8;
}
</style>
