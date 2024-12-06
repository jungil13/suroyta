<template>
  <section class="container mx-auto p-6 max-w-7xl mt-16 animate-fade-in">
    <div class="text-center mb-16 mt-20">
      <p class="font-extrabold text-5xl text-gray-100 mb-4">PROMOTIONS</p>
      <p class="font-medium text-lg text-gray-100">Browse promoted destinations in Cebu</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      <div v-for="(promotion, index) in promotions" :key="promotion.id"
        class="bg-teal-50 border border-teal-300 rounded-lg shadow-md shadow-black overflow-hidden flex flex-col md:flex-row">
        
        <!-- Left Section: Content -->
        <div class="relative bg-clip-border rounded-t-lg bg-teal-800 overflow-hidden mb-4 md:mb-0 md:w-1/3">
          <div v-if="promotion.images.length > 0" class="relative">
            <img v-for="(image, i) in promotion.images" :key="i" v-show="promotion.currentImageIndex === i" :src="image"
              :alt="promotion.title" class="object-cover w-full h-full transition-opacity duration-500" />
            <div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between">
              <button @click="prevImage(index)"
                class="bg-teal-600 text-white px-4 py-2 rounded-full opacity-70 hover:opacity-100">
                &#10094;
              </button>
              <button @click="nextImage(index)"
                class="bg-teal-600 text-white px-4 py-2 rounded-full opacity-70 hover:opacity-100">
                &#10095;
              </button>
            </div>
          </div>
        </div>

        <!-- Right Section: Image Slideshow -->
        <div class="flex-1 p-4">
          <!-- Author Information -->
          <div class="flex items-center justify-between mb-2">
                <!-- Promotion Title -->
          <h2 class="text-xl font-semibold text-teal-800 mb-2 line-clamp-1">
            <i class="fas fa-bullhorn mr-2 text-teal-700"></i> {{ promotion.title }}
          </h2>
              <!-- Three Dots Menu -->
              <div class="relative">
                <button @click="toggleMenu(promotion.id)" class="text-gray-500">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div v-if="isMenuVisible(promotion.id)"
                  class="absolute right-0 bg-white shadow-md shadow-black rounded-md w-40 py-2 mt-2">
                  <button class="block px-4 py-2 text-sm text-red-700" @click="openReportModal(promotion.id)">Report</button>
                </div>
              </div>
            </div>
          <!-- Promotion Description -->
          <p class="text-sm text-teal-600 mb-4 line-clamp-1">
            <i class="fas fa-info-circle mr-2 text-teal-600"></i> {{ promotion.description }}
          </p>

          <!-- Promotion Start Date -->
          <p class="text-sm text-gray-500 mb-2">
            <i class="fas fa-calendar-alt mr-2 text-gray-400"></i> Start Date: {{ promotion.start_date }}
          </p>

          <!-- Promotion End Date -->
          <p class="text-sm text-gray-500 mb-4">
            <i class="fas fa-calendar-check mr-2 text-gray-400"></i> End Date: {{ promotion.end_date }}
          </p>

          <!-- Promotion Destination -->
          <p class="text-sm font-medium text-teal-700 mb-4">
            <i class="fas fa-map-marker-alt mr-2 text-teal-700"></i> Destination: {{ promotion.destination }}
          </p>
          <router-link
           :to="{ name: 'promotionlists', params: { id: promotion.id } }"
            class="flex justify-end items-center font-semibold text-blue-500"
          >
            <i class="fas fa-map-marker-alt mr-2"></i> View on Map
          </router-link>
        </div>
      </div>
    </div>
     <!-- Report Modal -->
     <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-lg font-bold text-teal-700 mb-4">Report Post</h3>
        <textarea
          v-model="reportReason"
          placeholder="Enter your reason for reporting"
          class="w-full p-2 border border-gray-300 rounded-lg"
          rows="4"
        ></textarea>
        <div class="flex justify-between mt-4">
          <button
            @click="submitReport"
            class="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Submit Report
          </button>
          <button
            @click="closeReportModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// Reactive Variables
const promotions = ref([]);
const visibleMenus = ref(new Set());
const reportReason = ref("");
const isModalOpen = ref(false);
const currentPromotionId = ref(null); // Fixed incorrect variable reference

// Functions to toggle menu visibility
const toggleMenu = (promotionId) => {
  if (visibleMenus.value.has(promotionId)) {
    visibleMenus.value.delete(promotionId);
  } else {
    visibleMenus.value.add(promotionId);
  }
};

const isMenuVisible = (promotionId) => {
  return visibleMenus.value.has(promotionId);
};

// Hide/Unhide Post Functionality
const toggleHide = (promotionId) => {
  console.log("Hide / Unhide promotion with ID:", promotionId);
  // Add logic for hiding/unhiding the promotion here
};

// Open and close report modal
const openReportModal = (promotionId) => {
  currentPromotionId.value = promotionId; // Set the current promotion ID for the modal
  isModalOpen.value = true;
};

const closeReportModal = () => {
  isModalOpen.value = false;
  reportReason.value = "";
};

// Submit a report
const submitReport = async () => {
  if (!reportReason.value) {
    Swal.fire({
      icon: "warning",
      title: "Missing Reason",
      text: "Please provide a reason for reporting the promotion.",
    });
    return;
  }

  try {
    await axios.post(
      "http://localhost:3000/api/reports/create",
      {
        promotion_id: currentPromotionId.value,
        reason: reportReason.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Report Submitted",
      text: "Promotion reported successfully. Admins will review you report and will take actions.",
    });

    closeReportModal();
  } catch (error) {
    console.error("Error reporting promotion:", error);

    Swal.fire({
      icon: "error",
      title: "Report Failed",
      text: "Failed to report the promotion. Please try again.",
    });
  }
};

// Fetch promotions from API
const fetchPromotions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/promotions/getallpromotions");
    promotions.value = response.data.map((promotion) => ({
      ...promotion,
      images: Array.isArray(promotion.images)
        ? promotion.images.map((url) => `http://localhost:3000${url.trim()}`)
        : promotion.images
        ? promotion.images.split(",").map((url) => `http://localhost:3000${url.trim()}`)
        : [],
      author_profile_photo: promotion.author_profile_photo
        ? `http://localhost:3000${promotion.author_profile_photo.trim()}`
        : "",
      currentImageIndex: 0,
    }));
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
};

// Slideshow Navigation
const nextImage = (promotionIndex) => {
  if (promotions.value[promotionIndex].images.length > 0) {
    promotions.value[promotionIndex].currentImageIndex =
      (promotions.value[promotionIndex].currentImageIndex + 1) %
      promotions.value[promotionIndex].images.length;
  }
};

const prevImage = (promotionIndex) => {
  if (promotions.value[promotionIndex].images.length > 0) {
    promotions.value[promotionIndex].currentImageIndex =
      (promotions.value[promotionIndex].currentImageIndex - 1 +
        promotions.value[promotionIndex].images.length) %
      promotions.value[promotionIndex].images.length;
  }
};

// Placeholder for rating promotions
const ratePromotion = (promotionId) => {
  console.log(`Rate promotion with ID: ${promotionId}`);
};

// Placeholder for reviewing promotions
const reviewPromotion = (promotionId) => {
  console.log(`Review promotion with ID: ${promotionId}`);
};

// Placeholder for viewing promotions on a map
const viewOnMap = (destination) => {
  console.log(`View map for destination: ${destination}`);
};

onMounted(fetchPromotions);
</script>

