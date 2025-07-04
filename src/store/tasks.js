import { defineStore } from 'pinia'
import api from '@/utils/axios'
import { toast } from 'vue-sonner'
import { t } from '@/utils/i18n'

const TASKS_KEY = 'tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem(TASKS_KEY)) || [],
    error: null,
    loading: false,
    fetchStatus: 'idle' // 'idle' | 'loading' | 'success' | 'error'
  }),

  actions: {
    async fetchTasks() {
      this.fetchStatus = 'loading'
      this.loading = true
      this.error = null
      try {
        console.log('Вызов FetchTasks')
        const res = await api.get('/tasks')
        this.tasks = res.data
        this.saveToLocalStorage()
        this.fetchStatus = 'success'
      } catch (err) {
        this.error = t('toast.taskFetchError')
        toast.error(this.error)
        this.fetchStatus = 'error'
      } finally {
        this.loading = false
      }
    },

    async addTask(text) {
      const tempId = Date.now()
      const newTask = { id: tempId, text, done: false }
      this.tasks.unshift(newTask)
      this.saveToLocalStorage()

      try {
        const res = await api.post('/tasks', { text })
        const index = this.tasks.findIndex((t) => t.id === tempId)
        if (index !== -1) {
          this.tasks[index] = res.data
          this.saveToLocalStorage()
        }
        toast.success(t('toast.taskAdded'))
      } catch (err) {
        this.tasks = this.tasks.filter((t) => t.id !== tempId)
        this.error = t('toast.taskAddError')
        toast.error(this.error)
        this.saveToLocalStorage()
      }
    },

    async toggleTask(task) {
      const index = this.tasks.findIndex((t) => t.id === task.id)
      if (index === -1) return

      const oldDone = this.tasks[index].done
      this.tasks[index].done = !oldDone
      this.saveToLocalStorage()

      try {
        await api.put(`/tasks/${task.id}`, { done: !oldDone })
      } catch (err) {
        this.tasks[index].done = oldDone
        this.error = t('toast.taskUpdateError')
        toast.error(this.error)
        this.saveToLocalStorage()
      }
    },

    async updateTask(id, payload) {
      const index = this.tasks.findIndex((t) => t.id === id)
      if (index === -1) return

      const originalTask = { ...this.tasks[index] }

      this.tasks[index] = { ...this.tasks[index], ...payload }
      this.saveToLocalStorage()

      try {
        const res = await api.put(`/tasks/${id}`, payload)
        this.tasks[index] = res.data
        this.saveToLocalStorage()
        toast.success(t('toast.taskUpdated'))
      } catch (err) {
        this.tasks[index] = originalTask
        this.saveToLocalStorage()
        toast.error(t('toast.taskUpdateError'))
      }
    },

    async trashTask(id) {
      const original = [...this.tasks]
      const taskToTrash = this.tasks.find((task) => task.id === id) // сохраняем

      this.tasks = this.tasks.filter((task) => task.id !== id)
      this.saveToLocalStorage()

      try {
        await api.put(`/tasks/${id}`, { status: 2 })

        toast(t('toast.taskTrashed'), {
          action: {
            label: t('toast.undo'),
            onClick: () => this.restoreTask(taskToTrash)
          }
        })
      } catch (err) {
        this.tasks = original
        this.error = t('toast.taskTrashError')
        toast.error(this.error)
        this.saveToLocalStorage()
      }
    },

    async restoreTask(task) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id)

      const restored = { ...task, status: 0, deleted_at: null }
      this.tasks.unshift(restored)
      this.saveToLocalStorage()

      try {
        const res = await api.put(`/tasks/${task.id}`, {
          status: 0,
          deleted_at: null
        })

        const index = this.tasks.findIndex((t) => t.id === task.id)
        if (index !== -1) {
          this.tasks[index] = res.data
          this.saveToLocalStorage()
        }

        toast.success(t('toast.taskRestored'))
      } catch (err) {
        this.tasks = this.tasks.filter((t) => t.id !== task.id)
        this.saveToLocalStorage()
        toast.error(t('toast.taskRestoreError'))
      }
    },

    async deleteTask(id) {
      const original = [...this.tasks]
      this.tasks = this.tasks.filter((task) => task.id !== id)
      this.saveToLocalStorage()

      try {
        await api.delete(`/tasks/${id}`)
        toast.warning(t('toast.taskDeleted'))
      } catch (err) {
        this.tasks = original
        this.error = t('toast.taskDeleteError')
        toast.error(this.error)
        this.saveToLocalStorage()
      }
    },

    clearError() {
      this.error = null
    },

    reset() {
      this.tasks = []
      this.error = null
      this.loading = false
      localStorage.removeItem(TASKS_KEY)
    },

    saveToLocalStorage() {
      localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks))
    }
  }
})
