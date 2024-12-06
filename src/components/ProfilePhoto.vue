<template>
  <div class="relative">
    <!-- Cover Photo -->
    <img
      src="@/assets/img/bitch.jpg" 
      alt="Cover Photo"
      class="w-full h-48 object-cover rounded-lg"
    />
    <div class="absolute top-32 left-4">
      <!-- Profile Photo -->
      <img
        :src="fullProfilePhotoUrl"
        alt="Profile Photo"
        class="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
        @error="setDefaultProfileImage"
      />
    </div>
    <div class="mt-16 ml-4">
      <h2 class="text-3xl font-bold text-gray-800">{{ userProfile.username }}</h2>
      <p class="text-gray-600">{{ userProfile.bio || 'This user has not set a bio yet.' }}</p>
    </div>

    <!-- Bio Update Form -->
    <div class="mt-4 ml-4">
      <h3 class="text-xl font-semibold text-gray-700">Update Bio</h3>
      <form @submit.prevent="updateBio">
        <textarea
          v-model="userProfile.bio"
          class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          rows="3"
          placeholder="Write your bio here..."
        ></textarea>
        <button
          type="submit"
          class="mt-2 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Bio
        </button>
      </form>
    </div>

    <!-- Followers Section -->
    <div class="mt-4 ml-4">
      <div class="flex flex-wrap mt-2">
        <div
          v-for="follower in followers"
          :key="follower.id"
          class="flex items-center mr-4 mb-2"
        >
          <img
            :src="follower.profile_photo || 'https://example.com/default-profile-photo.jpg'"
            alt="Follower Photo"
            class="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
            @error="setDefaultProfileImage"
          />
          <span class="ml-2 text-gray-700">{{ follower.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const userProfile = ref({
  username: '',
  bio: '',
  profile_photo: ''
});
const followers = ref([]); // Array to hold followers
const baseUrl = 'http://localhost:3000'; // Base URL for API

// Computed property for profile photo URL
const fullProfilePhotoUrl = computed(() => {
  return userProfile.value.profile_photo
    ? `${baseUrl}${userProfile.value.profile_photo}`
    : 'https://example.com/default-profile-photo.jpg'; // Default profile photo
});

// Fetch user profile and followers on component mount
onMounted(async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/profile/myprofile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    userProfile.value = response.data.user; // Populate user profile data

    // Fetch followers after fetching the user profile
    const followersResponse = await axios.get(`${baseUrl}/api/profile/followers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    followers.value = followersResponse.data.followers; // Populate followers data
  } catch (error) {
    console.error('Error fetching user profile or followers:', error);
  }
});

// Update bio with SweetAlert
const updateBio = async () => {
  try {
    await axios.put(`${baseUrl}/api/profile/bio`, { bio: userProfile.value.bio }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // Show success alert
    Swal.fire({
      icon: 'success',
      title: 'Bio Updated',
      text: 'Your bio has been successfully updated.',
    });
  } catch (error) {
    console.error('Error updating bio:', error);
    // Show error alert
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: 'There was an issue updating your bio. Please try again later.',
    });
  }
};

// Fallback for profile image error
const setDefaultProfileImage = (event) => {
  event.target.src = 'https://example.com/default-profile-photo.jpg'; // Default image URL
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
