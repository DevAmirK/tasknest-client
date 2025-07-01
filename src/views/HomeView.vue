<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 bg-white shadow py-4 px-6">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/">
          <img src="/logo.png" alt="" width="200" height="50" />
        </router-link>

        <nav class="flex items-center gap-4">
          <Languages />
          <router-link to="/login" class="text-gray-700 hover:text-blue-600 mr-4">{{ $t('auth.login') }}</router-link>
        </nav>
      </div>
    </header>

    <main class="flex-1 container mx-auto px-4 py-6">
      <div class="min-h-screen flex flex-col bg-white text-gray-800">
        <!-- Hero Section -->
        <section class="flex-1 flex flex-col justify-center items-center text-center px-4">
          <h2 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {{ $t('home.heroTitle.part1') }}
            <span class="text-blue-500">{{ $t('home.heroTitle.highlight') }}</span>
          </h2>
          <p class="text-gray-600 text-lg mb-6 max-w-xl">
            {{ $t('home.heroSubtitle') }}
          </p>
          <router-link to="/register" class="btn-primary text-lg px-6 py-3">
            {{ $t('home.getStarted') }}
          </router-link>
        </section>

        <!-- Features -->
        <section class="py-12 bg-gray-50">
          <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div class="text-blue-500 mb-2 text-4xl">📝</div>
              <h3 class="font-semibold text-xl mb-2">
                {{ $t('home.features.simple.title') }}
              </h3>
              <p class="text-gray-600 text-sm">
                {{ $t('home.features.simple.desc') }}
              </p>
            </div>
            <div>
              <div class="text-green-500 mb-2 text-4xl">🔒</div>
              <h3 class="font-semibold text-xl mb-2">
                {{ $t('home.features.secure.title') }}
              </h3>
              <p class="text-gray-600 text-sm">
                {{ $t('home.features.secure.desc') }}
              </p>
            </div>
            <div>
              <div class="text-purple-500 mb-2 text-4xl">🚀</div>
              <h3 class="font-semibold text-xl mb-2">
                {{ $t('home.features.fast.title') }}
              </h3>
              <p class="text-gray-600 text-sm">{{ $t('home.features.fast.desc') }}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
    <footer class="bg-gray-100 py-4 text-center text-sm text-gray-500">
      &copy; {{ new Date().getFullYear() }} Tasknest. {{ $t('layout.copyright') }}.
      <br />
      {{ $t('layout.createdBy') }} DevAmirK
    </footer>
  </div>
</template>

<script setup>
import Languages from '@/components/Languages.vue'
</script>
