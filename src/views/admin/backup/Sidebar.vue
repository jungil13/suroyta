<template>
  <aside class="w-64 bg-white text-black font-semibold p-6 h-full shadow-md shadow-black">
    <h2 class="text-2xl font-bold mb-16">Admin Panel</h2>
    <ul class="space-y-12">
      <li>
        <router-link to="/dashboard/home" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-home mr-3"></i> Home
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/users" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-users mr-3"></i> Users
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/posts" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-pencil-alt mr-3"></i> Posts
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/reports" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-pencil-alt mr-3"></i> Reports
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/promotions" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-pencil-alt mr-3"></i> Promotions
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/comments" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-comments mr-3"></i> Comments
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/categories" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-tags mr-3"></i> Categories
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/destinations" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-map-marker-alt mr-3"></i> Destinations
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/settings" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
          <i class="fas fa-cog mr-3"></i> Settings
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
/* You can remove the scoped styles since the Tailwind CSS classes take care of most of the styling */
</style>
