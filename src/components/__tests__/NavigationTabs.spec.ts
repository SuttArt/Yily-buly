import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router' // This import should point to your routes file declared above

import NavigationTabs from '../NavigationTabs.vue'

// More about testing with Router: https://test-utils.vuejs.org/guide/advanced/vue-router.html
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('NavigationTabs', () => {
  beforeEach(async () => {
    // Ensures the router is ready before running tests
    await router.push('/')
    await router.isReady()
  })

  const path_name = [
    { path: 'home', name: 'Home' },
    { path: 'mybook', name: 'My Book' },
    { path: 'search', name: 'Search' },
    { path: 'settings', name: 'Settings' }
  ]

  const wrapper = mount(NavigationTabs, {
    props: { path_name },
    global: { plugins: [router] }
  })

  it('renders all navigation tabs', async () => {
    // Wait for Vue to process updates
    await wrapper.vm.$nextTick()

    // Ensure all tabs are rendered
    path_name.forEach(({ name }) => {
      expect(wrapper.text()).toContain(name)
    })
  })

  it('sets the correct active tab based on route', async () => {
    // Wait for Vue to process updates
    await wrapper.vm.$nextTick()

    // Check if the correct tab is marked as active
    let activeTab = wrapper.find('.active') // Assuming active class is used
    expect(activeTab.exists()).toBe(true)
    expect(activeTab.text()).toBe(path_name[0].name)

    // Simulate navigation to '/search'
    await router.push(path_name[2].path)
    await wrapper.vm.$nextTick()

    activeTab = wrapper.find('.active') // Assuming active class is used
    // Check if the correct tab is marked as active
    expect(activeTab.exists()).toBe(true)
    expect(activeTab.text()).toBe(path_name[2].name)
  })

  it('sets the correct active tab when clicked', async () => {
    // Find all buttons instead of 'a'
    const buttons = wrapper.findAll('button')

    // Click on the third button (index 2 -> "Search")
    await buttons[2].trigger('click')
    await wrapper.vm.$nextTick()

    // Check if the clicked button has the active class
    expect(buttons[2].classes()).toContain('active')

    // Ensure other buttons are NOT active
    buttons.forEach((btn, index) => {
      if (index !== 2) {
        expect(btn.classes()).not.toContain('active')
      }
    })
  })
})
