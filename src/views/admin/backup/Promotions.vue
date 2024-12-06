<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// State variables to hold data
const promotions = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5; // Number of promotions to show per page

// Fetch promotions from API
const fetchPromotions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/promotions/getallpromotions/');
    promotions.value = response.data;
  } catch (error) {
    console.error('Error fetching promotions:', error);
  }
};

// Pagination logic
const paginatedPromotions = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return promotions.value.slice(startIndex, startIndex + itemsPerPage);
});

// Calculate the total number of pages
const totalPages = computed(() => {
  return Math.ceil(promotions.value.length / itemsPerPage);
});

// Methods for changing pages
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(fetchPromotions);
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Promotions Management</h1>

    <!-- Promotions Table -->
    <table class="min-w-full table-auto bg-white border border-gray-300 shadow-md rounded-lg mb-6">
      <thead class="bg-teal-600 text-white">
        <tr>
          <th class="px-4 py-2 text-left">Title</th>
          <th class="px-4 py-2 text-left">Description</th>
          <th class="px-4 py-2 text-left">Start Date</th>
          <th class="px-4 py-2 text-left">End Date</th>
          <th class="px-4 py-2 text-left">Destination</th>
          <th class="px-4 py-2 text-left">Author</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="promotion in paginatedPromotions" :key="promotion.id">
          <td class="px-4 py-2 border-b">{{ promotion.title }}</td>
          <td class="px-4 py-2 border-b">{{ promotion.description.slice(0, 100) }}...</td>
          <td class="px-4 py-2 border-b">{{ new Date(promotion.start_date).toLocaleDateString() }}</td>
          <td class="px-4 py-2 border-b">{{ new Date(promotion.end_date).toLocaleDateString() }}</td>
          <td class="px-4 py-2 border-b">{{ promotion.destination }}</td>
          <td class="px-4 py-2 border-b">
            <img :src="promotion.author_profile_photo" alt="Author" class="w-8 h-8 rounded-full inline-block mr-2">
            {{ promotion.author_username }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="mt-6 flex justify-center space-x-4">
      <button
        @click="changePage(currentPage.value - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
      >
        Previous
      </button>
      
      <span class="px-4 py-2 text-lg font-semibold">{{ currentPage }}</span>
      
      <button
        @click="changePage(currentPage.value + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
