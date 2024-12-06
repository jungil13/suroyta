<template>
  <div class="home p-6">
    <h2 class="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
    <p class="mb-6 text-gray-600">This is the home page of your admin panel.</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Users" :count="dashboardCounts.userCount" icon="👤" />
      <Card title="Destinations" :count="dashboardCounts.destinationCount" icon="📍" />
      <Card title="Posts" :count="dashboardCounts.postCount" icon="📝" />
      <Card title="Comments" :count="dashboardCounts.commentCount" icon="💬" />
      <Card title="Likes" :count="dashboardCounts.likeCount" icon="❤️" />
      <Card title="Views" :count="dashboardCounts.viewCount" icon="👁️" />
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
</style>