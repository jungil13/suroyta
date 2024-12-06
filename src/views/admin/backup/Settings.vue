<template>
  <div class="settings p-6 bg-white rounded-lg shadow-md shadow-black">
    <h2 class="text-2xl font-bold mb-4">Settings</h2>
    <p class="mb-6 text-gray-600">Manage your application settings here.</p>
    <!-- Add your settings form or options here -->
    <RouterLink to="/posts" class="shadow-lg shadow-black bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500 transition">
      Go to Page
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>