<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-white shadow-md shadow-black text-gray-800 shadow-md">
    <div class="container mx-auto px-1">
      <div class="flex justify-between items-center">
        <div @click="toggleCreatePosts"
          class="flex items-center space-x-4 p-4 cursor-pointer  rounded-lg ">
          <router-link to="/" class="flex items-center space-x-3">
            <!-- Logo with Stroke -->
             <img
              src="@/assets/suroy.png"
              alt="Logo"
              class="h-16 w-auto glowing-logo drop-shadow-[0_0_5px_black] filter"
              style="filter: drop-shadow(2px 2px 2px black);"
            />
          </router-link>

          <!-- Brand Name and Tagline -->
          <div class="flex flex-col">
            <!-- Brand Name -->
            <h1 class="font-extrabold text-2xl text-teal-600 font-poppins">
              SUROY - <span class="text-teal-600" >TA</span>
            </h1>
            <!-- Tagline -->
            <p class="text-sm text-gray-600 italic font-semibold mr-6">Explore the wonders of Cebu with ease!</p>
          </div>
            <h1 class="mt-2 font-semibold text-gray-700 font-poppins"><i class="fa-solid fa-chevron-down"></i></h1>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleDrawer" class="md:hidden text-gray-800 focus:outline-none">
          <i class="fa-solid fa-bars"></i>
        </button>

        <!-- Drawer Menu (for mobile) -->
        <div v-if="drawerOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden" @click="toggleDrawer">
          <div class="w-3/4 sm:w-2/3 md:w-1/3 h-full bg-slate-800 shadow-md p-4" @click.stop>
            <router-link v-if="!isLoggedIn" to="/login"
              class="block px-6 py-2 text-teal-600 font-medium hover:text-blue-700 transition duration-300">
              Login
            </router-link>
            <router-link v-if="!isLoggedIn" to="/register"
              class="block px-6 py-2 bg-teal-600 text-white font-medium rounded hover:bg-blue-700 transition duration-300">
              Get Started
            </router-link>
            <div v-if="isLoggedIn" class="flex items-center space-x-4">
              <img :src="profilePhoto" alt="Profile"
                class="h-10 w-10 rounded-full object-cover border-2 border-white-600">
              <div @click="toggleDropdown" class="cursor-pointer">
                <i class="fa-solid fa-chevron-down text-white md:text-black"></i>
              </div>
              <div v-if="dropdownOpen" class="absolute top-20 left-0 w-48 bg-white shadow-md shadow-black rounded">
                <button @click="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                  Logout
                </button>
                <router-link to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                  Profile
                </router-link>
                <router-link  to="/dashboard/home" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                  Dashboard
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Auth Buttons (desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link v-if="!isLoggedIn" to="/login"
            class="px-6 py-2 text-teal-600 font-medium hover:text-blue-700 transition duration-300">
            Login
          </router-link>
          <router-link v-if="!isLoggedIn" to="/register"
            class="px-6 py-2 bg-teal-600 text-white font-medium rounded hover:bg-blue-700 transition duration-300">
            Get Started
          </router-link>
          <div v-if="isLoggedIn" class="flex items-center space-x-4 relative">
            <img :src="profilePhoto" alt="Profile" class="h-10 w-10 rounded-full object-cover border-2 border-blue-600">
            <div @click="toggleDropdown" class="cursor-pointer">
              <span class="font-semibold">{{username}}</span>
              <i class="fa-solid fa-chevron-down ml-4"></i>
            </div>
            <div v-if="dropdownOpen" class="z-50 absolute right-1 top-12 w-48 bg-white shadow-md shadow-black rounded">
              <button @click="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Logout
              </button>
              <router-link to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Profile
              </router-link>
              <router-link  to="/dashboard/home" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Dashboard
                </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CreatePosts Component -->
    <CreatePosts v-if="showCreatePosts" />
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CreatePosts from './CreatePosts.vue';

const dropdownOpen = ref(false); // State for dropdown visibility
const showCreatePosts = ref(false); // State for CreatePosts visibility
const drawerOpen = ref(false); // State for drawer visibility

// Reactive state for user profile
const username = ref('');
const profilePhoto = ref(''); // Reactive state for profile photo
const isLoggedIn = computed(() => !!localStorage.getItem('token')); // Check if user is logged in

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value; // Toggle dropdown visibility
}

function toggleCreatePosts() {
  showCreatePosts.value = !showCreatePosts.value; // Toggle CreatePosts visibility
}

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value; // Toggle drawer visibility
}

// Set initial state on mounted
onMounted(() => {
  username.value = localStorage.getItem('username') || ''; // Get username from localStorage
  const storedPhoto = localStorage.getItem('profilePhoto');
  profilePhoto.value = storedPhoto ? `http://localhost:3000${storedPhoto}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBwg3rWQL6MFgjCkGVKXHONchGOaaeHuEww&s'; // Construct full URL
  console.log('Profile Photo URL:', profilePhoto.value);
});

// Logout function
const logout = () => {
  localStorage.removeItem('token'); // Clear token
  localStorage.removeItem('username'); // Clear username
  localStorage.removeItem('profilePhoto'); // Clear profile photo
  username.value = ''; // Reset username
  profilePhoto.value = ''; // Reset profile photo
  window.location.href = '/'; // Redirect to home and reload
};
</script>

<style scoped>
/* Add custom styles for mobile drawer */
.drawer {
  transition: transform 0.3s ease;
}

.drawer-hidden {
  transform: translateX(-100%);
}

.drawer-visible {
  transform: translateX(0);
}

.dropdown {
  display: none;
}

.dropdown-open {
  display: block;
}
.glowing-logo {
  transition: transform 0.3s ease-in-out;
  filter: drop-shadow(0 0 1px rgb(0, 0, 0));
  animation: glow 1s infinite alternate;
}

/* Glowing effect animation */
@keyframes glow {
  0% {
    filter: drop-shadow(0 0 2px rgb(0, 72, 75));
  }
  100% {
    filter: drop-shadow(0 0 3px rgb(0, 0, 0));
  }
}

.glowing-logo:hover {
  transform: scale(1.1); /* Slightly enlarge the logo on hover */
}
</style>
