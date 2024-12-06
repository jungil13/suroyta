<template>
  <div class="p-6 bg-white rounded-lg shadow-lg shadow-black">
    <h2 class="text-2xl font-bold mb-4">Destinations Management</h2>

    <!-- Search Input -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by destination"
        class="border border-gray-300 rounded px-4 py-2 w-full"
      />
    </div>

    <table class="min-w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2">ID</th>
          <th class="border border-gray-300 px-4 py-2">Destination</th>
          <th class="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="destination in paginatedDestinations" :key="destination.id" class="hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2">{{ destination.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ destination.destination }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <button @click="deleteDestination(destination.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
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

const destinations = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 5; // Number of items per page

// Fetch destinations from the backend
const fetchDestinations = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage
    const response = await axios.get('http://localhost:3000/api/destinations', {
      headers: {
        Authorization: token, // Send the token in the Authorization header
      },
    });
    // Add fake IDs to the destinations
    destinations.value = response.data.map(destination => ({
      id: Math.floor(Math.random() * 10000), // Generate a random ID
      destination: destination.destination,
    }));
  } catch (error) {
    console.error('Error fetching destinations:', error);
  }
};

onMounted(fetchDestinations);

// Computed property for filtered destinations
const filteredDestinations = computed(() => {
  return destinations.value.filter(destination => {
    return destination.destination && destination.destination.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

// Computed property for paginated destinations
const paginatedDestinations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredDestinations.value.slice(start, start + itemsPerPage);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(filteredDestinations.value.length / itemsPerPage);
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

const deleteDestination = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    await axios.delete(`http://localhost:3000/api/destinations/${id}`, {
      headers: {
        Authorization: token, // Send the token in the Authorization header
      },
    });
    destinations.value = destinations.value.filter(destination => destination.id !== id); // Remove the destination from the local state
    console.log(`Deleted destination with ID: ${id}`);
  } catch (error) {
    console.error(`Error deleting destination with ID ${id}:`, error);
  }
};
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>