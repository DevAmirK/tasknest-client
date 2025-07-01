import { defineStore } from 'pinia'
import api from '@/utils/axios'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    error: null,
    loading: false,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/tasks')
        this.tasks = res.data
      } catch (err) {
        this.error = 'Failed to load tasks'
      } finally {
        this.loading = false
      }
    },

    async addTask(text) {
      try {
        const res = await api.post('/tasks', { text })
        this.tasks.unshift(res.data)
      } catch (err) {
        this.error = 'Failed to add task'
      }
    },

    async toggleTask(task) {
      try {
        const res = await api.put(`/tasks/${task.id}`, {
          done: !task.done,
        })
        const index = this.tasks.findIndex(t => t.id === task.id)
        if (index !== -1) this.tasks[index] = res.data
      } catch (err) {
        this.error = 'Failed to update task'
      }
    },

    async deleteTask(id) {
      try {
        await api.delete(`/tasks/${id}`)
        this.tasks = this.tasks.filter(task => task.id !== id)
      } catch (err) {
        this.error = 'Failed to delete task'
      }
    },

    clearError() {
      this.error = null
    },

    reset() {
      console.log('RESET TASKS')
      this.tasks = []
      this.error = null
      this.loading = false
    }
  },
})
