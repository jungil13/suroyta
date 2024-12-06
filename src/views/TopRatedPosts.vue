<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-extrabold text-black text-center mb-8">Top Rated Destinations</h1>
  
      <!-- Loading Spinner -->
      <div v-if="loading" class="flex justify-center items-center h-40">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 animate-spin text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="4"></circle>
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 12a8 8 0 0116 0A8 8 0 014 12z"></path>
        </svg>
      </div>
  
      <!-- Error Message -->
      <div v-if="error" class="text-center text-red-500 font-semibold">
        {{ error }}
      </div>
  
      <!-- Posts Grid -->
      <div v-if="posts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="post in posts"
          :key="post.post_id"
          class="bg-white border rounded-lg shadow-md shadow-black hover:shadow-xl hover:shadow-black transition-shadow duration-300 overflow-hidden "
        >
          <!-- Carousel -->
          <div class="relative">
            <div class="overflow-hidden">
              <div
                class="whitespace-nowrap transition-transform duration-700 ease-in-out"
                :style="{ transform: `translateX(-${post.currentImageIndex * 100}%)` }"
              >
                <img
                  v-for="(image, index) in post.images"
                  :key="index"
                  :src="image"
                  alt="Post image"
                  class="w-full h-48 object-cover inline-block"
                />
              </div>
            </div>
            <!-- Top Rated Banner -->
          <div class="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
            Top Rated
          </div>
            <!-- Carousel Controls -->
            <div
              class="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75"
              @click="prevImage(post)"
            >
              <i class="fas fa-chevron-left"></i>
            </div>
            <div
              class="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75"
              @click="nextImage(post)"
            >
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
  
          <!-- Post Info -->
          <div class="p-4">
            <h2 class="text-xl font-bold text-black mb-2 truncate">{{ post.post_title }}</h2>
            <p class="text-black font-semibold mb-4 truncate">{{ post.post_content }}</p>
            <div class="text-sm text-black font-semibold space-y-1">
              <p><i class="fas fa-map-marker-alt mb-4"></i> Destination: {{ post.post_destination }}</p>
              <p><i class="fas fa-star text-teal-500"></i> Rating: {{ post.formattedRating }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- No Posts Message -->
      <div v-else class="text-center text-gray-500 mt-6">
        No top-rated posts found.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  // Data References
  const posts = ref([]);
  const loading = ref(true);
  const error = ref("");
  
  // Function to format the average rating
  const getFormattedRating = (avgRating) => {
    const rating = parseFloat(avgRating) || 0; // Ensure avg_rating is numeric
    return `${rating.toFixed(1)}/5`; // Format as "X.X/5"
  };
  
  // Fetch Posts
  const fetchTopPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/destinations/top-destinations");
      posts.value = response.data.map((post) => ({
        ...post,
        images: post.post_images
          ? post.post_images.split(",").map((url) => `http://localhost:3000${url.trim()}`)
          : [],
        currentImageIndex: 0, // Initialize image index for each post
        formattedRating: getFormattedRating(post.avg_rating), // Add formatted rating
      }));
    } catch (err) {
      error.value = "Failed to load posts. Please try again.";
    } finally {
      loading.value = false;
    }
  };
  
  // Next Image
  const nextImage = (post) => {
    const totalImages = post.images.length;
    post.currentImageIndex = (post.currentImageIndex + 1) % totalImages;
  };
  
  // Previous Image
  const prevImage = (post) => {
    const totalImages = post.images.length;
    post.currentImageIndex = (post.currentImageIndex - 1 + totalImages) % totalImages;
  };
  
  // Fetch Posts on Mount
  onMounted(fetchTopPosts);
  </script>
  
  <style scoped>
  /* Scoped Styles for Custom Adjustments */
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .h-48 {
    height: 12rem; /* Adjust carousel height */
  }
  </style>
  