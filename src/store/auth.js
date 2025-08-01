import { defineStore } from 'pinia'
import api from '@/utils/axios'
import { useTasksStore } from './tasks'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
    loading: false
  }),

  actions: {
    async register({ name, email, password }) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/register', { name, email, password })
        this.token = res.data.token
        localStorage.setItem('token', this.token)
        await this.fetchUser()
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed'
      } finally {
        this.loading = false
      }
    },

    async login({ email, password }) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/login', { email, password })
        this.token = res.data.token
        localStorage.setItem('token', this.token)
        await this.fetchUser()
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed'
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      try {
        const res = await api.get('/profile', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.user = res.data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        this.user = null
        localStorage.removeItem('user')
      }
    },

    async logout() {
      const tasksStore = useTasksStore()
      setTimeout(() => {
        tasksStore.reset()
      }, 2000)

      try {
        await api.post(
          '/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
