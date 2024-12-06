<template>
  <div class="flex h-screen items-center justify-center bg-teal-100">
    <div class="flex w-11/12 max-w-4xl rounded-lg shadow-lg shadow-black bg-white overflow-hidden animate-fade-in">
      <!-- Left Section (Form) -->
      <div class="flex flex-col justify-center w-1/2 p-6 md:p-10 bg-white">
        <div class="space-y-4 text-center md:text-left">
          <h2 class="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p class="text-sm text-gray-600">Please login to continue</p>
        </div>
        <div class="mt-6">
          <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
            <img src="https://freesvg.org/img/1534129544.png" alt="Google Logo" class="h-5 w-5" />
            Sign in with Google
          </button>
        </div>
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-gray-500">Or login with</span>
          </div>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-semibold text-gray-700">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              placeholder="Enter your username"
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <label for="remember_me" class="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                class="rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-2"
              />
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-sm text-teal-600 hover:text-teal-800">Forgot password?</a>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="mt-4 w-full rounded-lg bg-teal-600 py-2 text-sm font-bold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Login</span>
          </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <RouterLink to="/register" class="text-teal-600 hover:text-teal-800">Register</RouterLink>
        </p>
      </div>

      <!-- Right Section (Image) -->
      <div class="hidden w-1/2 bg-cover bg-teal-600 bg-center md:block">
        <img src="https://media0.giphy.com/media/3ohs4oVhPxtxcgRIE8/giphy.gif?cid=6c09b9528kapjefxmsfpplbu65frt0xr8t8noi74usek7uj4&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" class="h-full w-full" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/axiosInstance';
import Swal from 'sweetalert2';

const username = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.post('api/auth/login', {
      username: username.value,
      password: password.value,
    });

    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('profilePhoto', user.profilePhoto || 'https://via.placeholder.com/150');
    localStorage.setItem('userType', user.user_type);
    localStorage.setItem('userId', user.id);

    Swal.fire('Success!', 'Login successful!', 'success');
    window.location.reload();
    if (user.user_type === 'Admin') {
      router.push('/dashboard/home');
    } else {
      router.push('/posts');
    }
  } catch (error) {
    Swal.fire('Error!', error.response?.data.message || 'Login failed!', 'error');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.card {
  height: 100%;
  position: absolute;
}
</style>