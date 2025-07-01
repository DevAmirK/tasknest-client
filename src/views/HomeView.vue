<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-800">
    <!-- Navbar -->
    <header class="flex items-center justify-between px-6 py-4 shadow-md">
      <h1 class="text-2xl font-bold text-blue-600">Tasknest</h1>
      <nav class="space-x-4">
        <router-link to="/login" class="text-sm hover:text-blue-500">Login</router-link>
        <router-link to="/register" class="text-sm hover:text-blue-500">Register</router-link>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="flex-1 flex flex-col justify-center items-center text-center px-4">
      <h2 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
        Organize your day <span class="text-blue-500">effortlessly</span>
      </h2>
      <p class="text-gray-600 text-lg mb-6 max-w-xl">
        Tasknest helps you stay on top of your tasks with clean design and powerful tools.
      </p>
      <router-link to="/register" class="btn-primary text-lg px-6 py-3">
        Get Started
      </router-link>
    </section>

    <!-- Features -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div class="text-blue-500 mb-2 text-4xl">📝</div>
          <h3 class="font-semibold text-xl mb-2">Simple Tasks</h3>
          <p class="text-gray-600 text-sm">Create, update, and delete your tasks with ease.</p>
        </div>
        <div>
          <div class="text-green-500 mb-2 text-4xl">🔒</div>
          <h3 class="font-semibold text-xl mb-2">Secure Access</h3>
          <p class="text-gray-600 text-sm">Your tasks are protected by modern authentication.</p>
        </div>
        <div>
          <div class="text-purple-500 mb-2 text-4xl">🚀</div>
          <h3 class="font-semibold text-xl mb-2">Fast Interface</h3>
          <p class="text-gray-600 text-sm">Built with Vue 3 + Tailwind v4 for speed and beauty.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500">
      © {{ new Date().getFullYear() }} Tasknest. Built by DevAmirK.
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
