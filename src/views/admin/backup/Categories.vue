<template>
    <div class="p-6 bg-white rounded-lg shadow-lg shadow-black">
      <h2 class="text-2xl font-bold mb-4">Categories Management</h2>
  
      <!-- Search Input -->
      <div class="mb-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by name"
          class="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
  
      <table class="min-w-full border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Name</th>
            <th class="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in paginatedCategories" :key="category.category_id" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-4 py-2">{{ category.category_id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ category.name }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button @click="deleteCategory(category.category_id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-between items-center">
        <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  const categories = ref([]);
  const searchQuery = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 5; // Number of items per page
  
  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage
      const response = await axios.get('http://localhost:3000/api/categories', {
        headers: {
          Authorization: token, // Send the token in the Authorization header
        },
      });
      categories.value = response.data; // Assuming the response data is an array of categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  onMounted(fetchCategories);
  
  // Computed property for filtered categories
  const filteredCategories = computed(() => {
    return categories.value.filter(category => {
      return category.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  });
  
  // Computed property for paginated categories
  const paginatedCategories = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredCategories.value.slice(start, start + itemsPerPage);
  });
  
  // Computed property for total pages
  const totalPages = computed(() => {
    return Math.ceil(filteredCategories.value.length / itemsPerPage);
  });
  
  // Pagination methods
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.delete(`http://localhost:3000/api/categories/${id}`, {
        headers: {
          Authorization: token, // Send the token in the Authorization header
        },
      });
      categories.value = categories.value.filter(category => category.category_id !== id); // Remove the category from the local state
      console.log(`Deleted category with ID: ${id}`);
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
    }
  };
  </script>
  
  <style scoped>
  /* No additional styles needed as Tailwind CSS is used */
  </style>