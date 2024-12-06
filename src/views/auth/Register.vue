<template>
  <div class="flex h-screen items-center justify-center bg-teal-100">
    <div class="flex w-11/12 max-w-4xl rounded-lg shadow-lg shadow-black bg-white overflow-hidden animate-fade-in">
    <!-- Form Section -->
    <div class="flex flex-col justify-center w-1/2 p-6 md:p-10 bg-white">
      <div class="space-y-4 text-center md:text-left">
        <!-- Title and Logo -->
        <div>
          <p class="text-2xl font-bold mb-3">Register</p>
          <p class="text-sm text-gray-600">Create your account to continue</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="mt-4">
          <!-- Username -->
          <div>
            <label for="username" class="block text-sm font-semibold text-gray-700">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          <!-- Email -->
          <div class="mt-4">
            <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          <!-- Password -->
          <div class="mt-4">
            <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          <!-- Register Button -->
          <div class="mt-6">
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-2 rounded-lg bg-teal-600 text-white font-bold shadow-lg hover:shadow-inner transition-transform transform hover:-translate-y-1 hover:scale-105 focus:outline-none"
            >
              <span v-if="loading">Loading...</span>
              <span v-else>Register</span>
            </button>
          </div>

          <!-- Login Redirect -->
          <div class="mt-4 text-center">
            <RouterLink to="/login" class="block text-sm font-semibold text-gray-700">
              Already have an account? Login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
     <!-- Right Section (Image) -->
     <div class="hidden w-1/2 bg-cover bg-teal-600 bg-center md:block">
        <img src="https://cdn.dribbble.com/users/31664/screenshots/2269610/car.gif" class="h-full w-full" />
      </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '@/axiosInstance'; // Axios instance import
import Swal from 'sweetalert2'; // SweetAlert2

const username = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.post('api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBwg3rWQL6MFgjCkGVKXHONchGOaaeHuEww&s',
    });
    Swal.fire('Success!', 'Registration successful!', 'success');
  } catch (error) {
    Swal.fire('Error!', error.response.data.message || 'Registration failed!', 'error');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
