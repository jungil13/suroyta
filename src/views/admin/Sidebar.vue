<template>
  <div>
    <!-- Mobile Drawer Button -->
    <button
      @click="toggleDrawer"
      class="lg:hidden p-4 text-white bg-blue-600 fixed top-4 left-4 z-50 rounded-full shadow-md focus:outline-none"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Drawer -->
    <aside
      v-if="drawerOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 lg:hidden z-40"
      @click="toggleDrawer"
    ></aside>

    <aside
      :class="[
        'lg:w-64 lg:flex lg:flex-col lg:space-y-12 bg-white text-black font-semibold p-6 h-full shadow-md shadow-black transition-all',
        drawerOpen ? 'w-64' : 'w-0 lg:w-64'
      ]"
      class="lg:w-64 fixed top-0 left-0 h-full z-50 overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-12 text-blue-600">Admin Panel</h2>
      <ul class="space-y-6">
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
            <i class="fas fa-flag mr-3"></i> Reports
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/promotions" class="flex items-center text-lg hover:text-blue-400 transition duration-300">
            <i class="fas fa-bullhorn mr-3"></i> Promotions
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
  </div>
</template>

<script setup>
import { ref } from 'vue';

const drawerOpen = ref(false);

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};
</script>

<style scoped>
/* Ensure that the transition effect works smoothly */
aside {
  transition: width 0.3s ease, transform 0.3s ease;
}

/* Optional: customize scrollbar if needed */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
