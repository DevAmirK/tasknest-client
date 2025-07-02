<script setup>
import { RouterView } from 'vue-router'
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <RouterView />
    <Toaster richColors />
  </div>
</template>

<style></style>
