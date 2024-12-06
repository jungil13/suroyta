<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-lg p-6 w-80 text-center relative">
      <span class="absolute top-2 right-2 text-gray-600 cursor-pointer" @click="closeModal">&times;</span>
      <img :src="user.profilePhoto || '/path/to/default-avatar.jpg'" alt="Author Photo" 
        class="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500" />
      <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ user.username }}</h2>
      <p class="text-gray-600 mb-4">{{ user.bio }}</p>
      <button @click="followUser" 
        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        Follow
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const props = defineProps({
  isVisible: Boolean,
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const followUser = async () => {
  console.log("User to follow:", props.user); // Debugging
  console.log("User ID to follow:", props.user?.id); // Debugging

  if (!props.user?.id) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid User',
      text: 'Unable to follow the user. User ID is missing.',
      confirmButtonText: 'OK',
    });
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/api/follow', {
      followedId: props.user.id, // Ensure this is being sent
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include authorization token
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'Followed Successfully',
      text: response.data.message,
      confirmButtonText: 'OK',
    });

    closeModal();
  } catch (error) {
    console.error('Error following user:', error);

    Swal.fire({
      icon: 'error',
      title: 'Failed to Follow',
      text: error.response?.data?.message || 'An error occurred. Please try again.',
      confirmButtonText: 'OK',
    });
  }
};


</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>
