<template>
  <!-- Dropdown Menu -->
   <div class="bg-white p-1 relative items-center text-center shadow-md shadow-black ">
    <div class="container mx-auto px-4 py-3 animate-fade-out">
      <div class="flex justify">
      <!-- Posts Dropdown -->
      <div class="relative w-full sm:w-auto top-2" @mouseover="openDropdown('latestDropdownOpen')"
        @mouseleave="closeDropdown('latestDropdownOpen')">
        <RouterLink to="/posts" class=" font-semibold py-2 px-4 rounded"
          aria-expanded="latestDropdownOpen">
          Destinations
        </RouterLink>
      </div>
      <div class="relative w-full sm:w-auto top-2" @mouseover="openDropdown('latestDropdownOpen')"
        @mouseleave="closeDropdown('latestDropdownOpen')">
        <RouterLink to="/promotionslists" class=" font-semibold py-2 px-4 rounded"
          aria-expanded="latestDropdownOpen">
          Promotions
        </RouterLink>
      </div>
      <!-- Destinations Dropdown -->
      <div class="relative w-full sm:w-auto" @mouseover="openDropdown('destinationDropdownOpen')"
        @mouseleave="closeDropdown('destinationDropdownOpen')">
        <button class="font-semibold py-2 px-4 rounded"
          aria-expanded="destinationDropdownOpen">
         Filter Destinations
        </button>

        <div v-if="destinationDropdownOpen" class="dropdown-content absolute bg-red-800 text-white rounded shadow-lg">
          <div v-if="destinationDropdownOpen" class="dropdown-content absolute bg-red-800 text-white rounded shadow-lg">
            <RouterLink v-for="destination in destinations" :key="destination.id"
              :to="`/destination/${destination.name}`"
              class=" py-2 px-12 hover:text-black cursor-pointer block" @click="reloadPage">
              {{ destination.name }}
            </RouterLink>
          </div>
        </div>
      </div>


      <!-- Categories Dropdown -->
      <div class="relative w-full sm:w-auto" @mouseover="openDropdown('categoryDropdownOpen')"
        @mouseleave="closeDropdown('categoryDropdownOpen')">
        <button class="font-semibold py-2 px-4 rounded" aria-expanded="categoryDropdownOpen">
          Destination Categories
        </button>

        <div v-if="categoryDropdownOpen" class="dropdown-content absolute bg-red-800 text-white rounded shadow-lg">
          <RouterLink v-for="category in categories" :key="category.id" :to="`/category/${category.name}`"
            class=" py-2 px-4 hover:text-black cursor-pointer block" @click="reloadPage">
            {{ category.name }}
          </RouterLink>
        </div>
      </div>
      <!-- Create Dropdown -->
      <div class="relative w-full sm:w-auto top-2">
        <RouterLink to="/create-post" class="font-semibold py-2 px-4 rounded">
          Create Post
        </RouterLink>
      </div>
      <div class="relative w-full sm:w-auto top-2">
        <RouterLink to="/promote" class="font-semibold py-2 px-4 rounded">
         Promote
        </RouterLink>
      </div>
    </div>
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click="closeModal">
    <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md" @click.stop>
      <h2 class="text-xl font-bold mb-4">Create a New Post</h2>
      <form @submit.prevent="submitPost">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
          <input v-model="title" type="text" id="title" required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
        </div>
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Content:</label>
          <textarea v-model="content" id="content" required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"></textarea>
        </div>
        <div class="mb-4">
          <label for="category_name" class="block text-sm font-medium text-gray-700">Category:</label>
          <select v-model="category_name" id="category_name" required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50">
            <option v-for="category in categories" :key="category.category_id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-700">Image:</label>
          <input type="file" @change="handleFileUpload" id="image" required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Create
            Post</button>
          <button type="button" @click="closeModal"
            class="ml-2 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import axiosInstance from "@/axiosInstance";

// Reactive state for dropdowns and data
const latestDropdownOpen = ref(false);
const dashboardDropdownOpen = ref(false);
const destinationDropdownOpen = ref(false);
const landscapeDropdownOpen = ref(false);
const createDropdownOpen = ref(false);
const destinations = ref([]);
const selectedDestination = ref('');
const posts = ref([]);

const categoryDropdownOpen = ref(false);
const categories = ref([]);
const selectedCategory = ref('');

async function fetchCategories() {
  try {
    const response = await axiosInstance.get('api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

async function fetchCategoryPosts(category) {
  selectedCategory.value = category;
  try {
    const response = await axiosInstance.get(`api/posts/category/${category}`);
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching category posts:', error);
  }
}

// Fetch destinations when dropdown opens
async function fetchDestinations() {
  try {
    const response = await axiosInstance.get('api/destinations');
    destinations.value = response.data; // axios response data is already parsed
  } catch (error) {
    console.error('Error fetching destinations:', error);
  }
}

// Fetch posts for a specific destination
async function fetchPosts(destination) {
  selectedDestination.value = destination; // Update selected destination
  try {
    const response = await axiosInstance.get(`api/posts/destination/${destination}`);
    posts.value = response.data; // Store the fetched posts
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Dropdown control functions
function openDropdown(dropdown) {
  switch (dropdown) {
    case "latestDropdownOpen":
      latestDropdownOpen.value = true;
      break;
    case "dashboardDropdownOpen":
      dashboardDropdownOpen.value = true;
      break;
    case "destinationDropdownOpen":
      destinationDropdownOpen.value = true;
      fetchDestinations(); // Fetch destinations when dropdown opens
      break;
    case "landscapeDropdownOpen":
      landscapeDropdownOpen.value = true;
      break;
    case "createDropdownOpen":
      createDropdownOpen.value = true;
      break;
    case "categoryDropdownOpen":
      categoryDropdownOpen.value = true;
      fetchCategories(); // Fetch categories when dropdown opens
      break;
  }
}

function closeDropdown(dropdown) {
  switch (dropdown) {
    case "latestDropdownOpen":
      latestDropdownOpen.value = false;
      break;
    case "dashboardDropdownOpen":
      dashboardDropdownOpen.value = false;
      break;
    case "destinationDropdownOpen":
      destinationDropdownOpen.value = false;
      break;
    case "landscapeDropdownOpen":
      landscapeDropdownOpen.value = false;
      break;
    case "createDropdownOpen":
      createDropdownOpen.value = false;
      break;
    case "categoryDropdownOpen":
      categoryDropdownOpen.value = false;
      break;
  }
}

// Log selected option (if needed)
function selectOption(option) {
  console.log(`Selected option: ${option}`);
}
</script>
