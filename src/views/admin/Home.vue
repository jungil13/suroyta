<template>
  <div class="text-black p-4 rounded-lg w-full md:w-[calc(100%-16rem)] ml-auto">
    <!-- Header Section -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-blue-500 mb-4">Welcome to the Admin Dashboard</h2>
      <p class="text-lg text-gray-600">This is the home page of your admin panel. Monitor and manage key metrics here.</p>
    </div>

    <!-- Dashboard Counts Cards Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card
        title="Users"
        :count="dashboardCounts.userCount"
        icon="👤"
        class="transition transform hover:scale-105 hover:shadow-lg hover:bg-blue-50"
      />
      <Card
        title="Destinations"
        :count="dashboardCounts.destinationCount"
        icon="📍"
        class="transition transform hover:scale-105 hover:shadow-lg hover:bg-green-50"
      />
      <Card
        title="Posts"
        :count="dashboardCounts.postCount"
        icon="📝"
        class="transition transform hover:scale-105 hover:shadow-lg hover:bg-yellow-50"
      />
      <Card
        title="Comments"
        :count="dashboardCounts.commentCount"
        icon="💬"
        class="transition transform hover:scale-105 hover:shadow-lg hover:bg-purple-50"
      />
      <Card
        title="Likes"
        :count="dashboardCounts.likeCount"
        icon="❤️"
        class="transition transform hover:scale-105 hover:shadow-lg hover:bg-red-50"
      />
      <Card
        title="Views"
        :count="dashboardCounts.viewCount"
        icon="👁️"
        class="transition transform hover:scale-105 hover:shadow-lg hover:bg-indigo-50"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '@/views/admin/Card.vue'; // Assuming you create a Card component
import axios from 'axios';

const dashboardCounts = ref({
  userCount: 0,
  destinationCount: 0,
  postCount: 0,
  commentCount: 0,
  likeCount: 0,
  viewCount: 0,
});

// Fetch dashboard counts from the backend
const fetchDashboardCounts = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage
    const response = await axios.get('http://localhost:3000/api/dashboard/counts', {
      headers: {
        Authorization: token, // Send the token in the Authorization header
      },
    });
    dashboardCounts.value = response.data; // Set the counts from the response
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
  }
};

onMounted(fetchDashboardCounts);
</script>

<style scoped>
/* Additional styling for cards and layout can be adjusted */
.home {
  background-color: #f8f8f8; /* Light background color */
}

.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Smooth transition for hover effects */
}

.card:hover {
  transform: scale(1.05); /* Scale effect on hover */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a shadow effect on hover */
}
</style>
