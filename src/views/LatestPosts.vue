<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <h1 class="text-3xl font-extrabold text-black text-center mb-8">Top Rated Promotions</h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center h-40">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 animate-spin text-teal-500" viewBox="0 0 24 24"
        fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="4"></circle>
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 12a8 8 0 0116 0A8 8 0 014 12z"></path>
      </svg>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-center text-red-500 font-semibold">
      {{ error }}
    </div>

    <!-- Promotions Grid -->
    <div v-if="formattedPromotions.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="promotion in formattedPromotions" :key="promotion.promotion_id"
        class="bg-white border rounded-lg shadow-md shadow-black hover:shadow-xl hover:shadow-black transition-shadow duration-300 overflow-hidden">
        <!-- Carousel -->
        <div class="relative">
          <div class="overflow-hidden">
            <div class="whitespace-nowrap transition-transform duration-700 ease-in-out"
              :style="{ transform: `translateX(-${promotion.currentImageIndex * 100}%)` }">
              <img v-for="(image, index) in promotion.images" :key="index" :src="image" alt="Promotion image"
                class="w-full h-48 object-cover inline-block" />
            </div>
          </div>
          <!-- Top Rated Banner -->
          <div class="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
            Top Rated
          </div>
          <!-- Carousel Controls -->
          <div
            class="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75"
            @click="prevImage(promotion)">
            <i class="fas fa-chevron-left"></i>
          </div>
          <div
            class="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75"
            @click="nextImage(promotion)">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- Promotion Info -->
        <div class="p-4">
          <h2 class="text-xl font-bold text-black mb-2 truncate line-clamp-1">{{ promotion.promotion_title }}
          </h2>
          <p class="text-gray-900 font-semibold mb-4 line-clamp-1">{{ promotion.promotion_description }}</p>
          <div class="text-gray-900 font-semibold text-sm text-gray-500 space-y-1">
            <p><i class="fas fa-calendar-alt"></i> Start: {{ promotion.start_date }}</p>
            <p><i class="fas fa-calendar-check"></i> End: {{ promotion.end_date }}</p>
            <p><i class="fas fa-star text-teal-500"></i> Rating: {{ promotion.formattedRating }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- No Promotions Message -->
    <div v-else class="text-center text-gray-500 mt-6">
      No promotions found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

// Data References
const promotions = ref([]);
const loading = ref(true);
const error = ref("");

const getFormattedRating = (promotion) => {
  const avgRating = parseFloat(promotion.avg_rating) || 0; // Ensure avg_rating is numeric
  return `${avgRating.toFixed(1)}/5`; // Format as "X.X/5"
};

// Computed property for formatted promotions
const formattedPromotions = computed(() =>
  promotions.value.map((promotion) => ({
    ...promotion,
    formattedRating: getFormattedRating(promotion),
  }))
);


// Fetch Promotions
const fetchTopPromotions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/destinations/top-promotions");
    promotions.value = response.data.map((promotion) => ({
      ...promotion,
      images: Array.isArray(promotion.promotion_images)
        ? promotion.promotion_images.map((url) => `http://localhost:3000${url.trim()}`)
        : promotion.promotion_images
          ? promotion.promotion_images.split(",").map((url) => `http://localhost:3000${url.trim()}`)
          : [],
      currentImageIndex: 0, // Initialize image index for each promotion
      avg_rating: parseFloat(promotion.avg_rating) || 0, // Parse avg_rating to ensure numeric
    }));
  } catch (err) {
    error.value = "Failed to load promotions. Please try again.";
  } finally {
    loading.value = false;
  }
};

// Next Image
const nextImage = (promotion) => {
  const totalImages = promotion.images.length;
  promotion.currentImageIndex = (promotion.currentImageIndex + 1) % totalImages;
};

// Previous Image
const prevImage = (promotion) => {
  const totalImages = promotion.images.length;
  promotion.currentImageIndex = (promotion.currentImageIndex - 1 + totalImages) % totalImages;
};

// Fetch Promotions on Mount
onMounted(fetchTopPromotions);
</script>

<style scoped>
/* Scoped Styles for Custom Adjustments */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {

  /* Adjust carousel height for smaller screens */
  .h-48 {
    height: 200px;
  }
}
</style>
