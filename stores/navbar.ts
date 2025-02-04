import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', {
  state: () => ({
    isTopNavbarVisible: true
  }),
  actions: {
    toggleTopNavbar() {
      this.isTopNavbarVisible = !this.isTopNavbarVisible
    },
    hideTopNavbar() {
      this.isTopNavbarVisible = false
    },
    showTopNavbar() {
      this.isTopNavbarVisible = true
    }
  }
}) 