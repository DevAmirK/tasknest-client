<template>
  <div class="min-h-screen flex flex-col app-wrapper">
    <header class="sticky top-0 shadow">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/">
          <img src="/logo.png" alt="Logo" class="h-7 w-auto sm:h-10" />
        </router-link>

        <nav class="flex items-center gap-8">
          <Languages class="relative" />
          <router-link to="/login" class="text-gray-700 font-semibold hover:text-blue-600 mr-4">{{ $t('auth.login') }}</router-link>
        </nav>
      </div>
    </header>

    <main class="flex-5 w-full px-4">
      <div class="min-h-screen flex flex-col text-gray-800">
        <section class="flex-1 flex flex-col justify-center items-center text-center px-4">
          <h2 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {{ $t('home.heroTitle.part1') }}
            <span class="text-blue-500">{{ $t('home.heroTitle.highlight') }}</span>
          </h2>
          <p class="text-gray-600 text-lg mb-6 max-w-xl">
            {{ $t('home.heroSubtitle') }}
          </p>
          <router-link to="/register" class="call-to-action text-lg font-semibold w-[8rem] py-3 rounded-4xl">
            <span>{{ $t('home.getStarted') }}</span>
          </router-link>
        </section>

        <section class="w-full py-6">
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

    <footer class="bg-white py-3 text-center text-sm text-gray-500 mt-12">
      &copy; {{ new Date().getFullYear() }} Tasknest. {{ $t('layout.copyright') }}.
      <br />
      {{ $t('layout.createdBy') }} <b>DevAmirK</b>
    </footer>
  </div>
</template>

<script setup>
import Languages from '@/components/Languages.vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-image: url('@/assets/bg.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
