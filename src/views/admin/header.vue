<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center shadow-xl rounded-lg w-full md:w-[calc(100%-16rem)] ml-auto">
    <!-- Logo Image -->
    <img
      src="@/assets/img/logo_1.png"
      alt="logo"
      class="h-12 w-auto mr-4"
    />

    <!-- Dashboard Title -->
    <h1 class="text-3xl font-extrabold text-blue-400 flex-1">SUROY-TA! Dashboard</h1>

    <!-- User Info Section -->
    <div class="user-info flex items-center space-x-6">
      <p class="text-lg text-white">Admin ||</p>
      <span class="text-xl font-medium uppercase text-white">{{ username }}</span> <!-- Display the logged-in user's name -->
      
      <!-- Logout Button -->
      <button
        @click="logout"
        class="flex items-center shadow-lg bg-red-600 text-white py-2 px-6 font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 space-x-2"
      >
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter for navigation

const router = useRouter(); // Initialize router
const username = ref(''); // Reactive variable to hold the username

// On component mount, retrieve the username from local storage
onMounted(() => {
  username.value = localStorage.getItem('username') || 'Guest'; // Default to 'Guest' if not found
});

const logout = () => {
  // Clear the bearer token and user data from local storage
  localStorage.removeItem('token'); // Remove the token
  localStorage.removeItem('username'); // Remove the username
  localStorage.removeItem('profilePhoto'); // Remove the profile photo
  localStorage.removeItem('user_type'); // Remove the user type

  console.log('Logout clicked'); // Log the logout action

  // Redirect to the login page or home page
  router.push('/login'); // Redirect to the login page
  window.location.reload();
};
</script>

<style scoped>
/* Scoped styles are minimal since most styles are handled by Tailwind CSS */
</style>
