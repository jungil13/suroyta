<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import CreatePosts from '@/components/CreatePosts.vue';
import Chatbot from './components/Chatbot.vue';

// Get the current route
const route = useRoute();

// Computed property to determine if the Navbar should be shown
const showNavbar = computed(() => {
  return !route.path.startsWith('/dashboard');
});

// Computed property to determine if CreatePosts should be shown
const showCreatePosts = computed(() => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
  return isLoggedIn && !route.path.startsWith('/dashboard');
});

// Computed property to determine if the Footer should be shown
const showFooter = computed(() => {
  return !route.path.startsWith('/dashboard');
});
</script>

<template>
  <div>
    <!-- Conditionally render the Navbar and CreatePosts components -->
    <Navbar v-if="showNavbar" />
    <CreatePosts v-if="showCreatePosts" />

    <!-- Router View to display child routes -->
    <RouterView />
  </div>
  
  <Chatbot />
  
  <!-- Conditionally render the Footer -->
  <footer v-if="showFooter" class="bg-black text-white py-8">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- About Section -->
      <div>
        <h3 class="text-lg font-bold mb-4">About Suroy Ta</h3>
        <p class="text-sm text-gray-400">
          Discover top destinations, read reviews, and explore the best of travel experiences with Suroy Ta.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-bold mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li>
            <a href="/home" class="text-sm text-gray-400 hover:text-white transition">Home</a>
          </li>
          <li>
            <a href="/destinations" class="text-sm text-gray-400 hover:text-white transition">Destinations</a>
          </li>
          <li>
            <a href="/contact" class="text-sm text-gray-400 hover:text-white transition">Contact Us</a>
          </li>
          <li>
            <a href="/about" class="text-sm text-gray-400 hover:text-white transition">About</a>
          </li>
        </ul>
      </div>

      <!-- Social Media & Contact -->
      <div>
        <h3 class="text-lg font-bold mb-4">Connect With Us</h3>
        <div class="flex space-x-4 mb-4">
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-instagram text-xl"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-youtube text-xl"></i>
          </a>
        </div>
        <p class="text-sm text-gray-400">
          Email: <a href="mailto:info@suroyta.com" class="hover:text-white">info@suroyta.com</a>
        </p>
        <p class="text-sm text-gray-400">Phone: +123 456 7890</p>
      </div>
    </div>

    <div class="mt-8 border-t border-gray-700 pt-4 text-center">
      <p class="text-sm text-gray-400">&copy; 2024 Suroy Ta. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style>
#app {
  background-color: rgb(14, 83, 78);
}
.animate-fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

.animate-fade-out {
  animation: fadeOut 1.1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 0;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-1px);
  }
}
</style>
