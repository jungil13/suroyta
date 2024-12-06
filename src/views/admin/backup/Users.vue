<template>
  <div class="p-6 bg-white rounded-lg  shadow-md shadow-black">
    <h2 class="text-2xl font-bold mb-4">User Management</h2>

    <!-- Search Input -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name or email"
        class="border border-gray-300 rounded px-4 py-2 w-full"
      />
    </div>

    <table class="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2">ID</th>
          <th class="border border-gray-300 px-4 py-2">Profile Photo</th>
          <th class="border border-gray-300 px-4 py-2">Name</th>
          <th class="border border-gray-300 px-4 py-2">Email</th>
          <th class="border border-gray-300 px-4 py-2">User_Type</th>
          <th class="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2">{{ user.user_id }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <img :src="`http://localhost:3000${user.profile_photo}`" alt="Profile Photo" class="w-12 h-12 rounded-full object-cover" />
          </td>
          <td class="border border-gray-300 px-4 py-2">{{ user.username }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.user_type }}</td>
          <td class="border border-gray-300 px-4 py-2 space-x-2">
            <button @click="editUser(user.id)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
              <i class="fas fa-trash"></i> Delete
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

const users = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 5; // Number of items per page

// Fetch users from the backend
const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/admin/users'); // Adjust the URL as needed
    users.value = response.data; // Assuming the response data is an array of users
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

onMounted(fetchUsers);

// Computed property for filtered users
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const userName = user.name ? user.name.toLowerCase() : ''; // Check if name exists
    const userEmail = user.email ? user.email.toLowerCase() : ''; // Check if email exists
    return (
      userName.includes(searchQuery.value.toLowerCase()) ||
      userEmail.includes(searchQuery.value.toLowerCase())
    );
  });
});

// Computed property for paginated users
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(start, start + itemsPerPage);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage);
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

const editUser = (id) => {
  console.log(`Edit user with ID: ${id}`);
  // Implement edit functionality here
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/admin/users/${id}`); // Adjust the URL as needed
    users.value = users.value.filter(user => user.id !== id); // Remove the user from the local state
    console.log(`Deleted user with ID: ${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
  }
};
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>