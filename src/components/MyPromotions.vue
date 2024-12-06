<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// State variables
const promotions = ref([]);
const isLoading = ref(false);
const isEditing = ref(false);
const editData = reactive({});

// Helper function to format dates
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Function to format images (splitting concatenated image URLs)
const formatImages = (imagesString) => {
  return imagesString ? imagesString.split(",") : [];
};

// Function to get full image URL (base URL prepended to the image URL)
const getFullImageUrl = (image) => {
  return `http://localhost:3000${image.trim()}`;
};

// Fetch promotions for the authenticated user
const fetchPromotions = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({
      icon: "error",
      title: "Unauthorized",
      text: "You need to log in to access your promotions.",
    });
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.get(
      `http://localhost:3000/api/promotions/getallpromotions/author/${getUserId()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    promotions.value = response.data.map((promotion) => ({
      ...promotion,
      promotion_images: formatImages(promotion.promotion_images),
      currentImageIndex: 0, // Set initial image index for each promotion
    }));
  } catch (error) {
    console.error("Error fetching promotions:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to fetch promotions. Please try again later.",
    });
  } finally {
    isLoading.value = false;
  }
};

// Auto slide the images in the promotion carousel
const startAutoSlide = (promotion) => {
  promotion.imageInterval = setInterval(() => {
    // Increment the image index to show the next image
    promotion.currentImageIndex =
      (promotion.currentImageIndex + 1) % promotion.promotion_images.length;
  }, 3000); // Change the image every 3 seconds
};

// Stop the auto slide when leaving the component
const stopAutoSlide = (promotion) => {
  clearInterval(promotion.imageInterval);
};

// Delete promotion
const deletePromotion = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmation.isConfirmed) return;

  try {
    await axios.delete(`http://localhost:3000/api/promotions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    promotions.value = promotions.value.filter((promotion) => promotion.id !== id);

    Swal.fire("Deleted!", "Your promotion has been deleted.", "success");
  } catch (error) {
    console.error("Error deleting promotion:", error);
    Swal.fire("Error", "Failed to delete promotion. Please try again.", "error");
  }
};

// Edit promotion
const editPromotion = (promotion) => {
  isEditing.value = true;
  Object.assign(editData, promotion);
};

// Cancel editing
const cancelEdit = () => {
  isEditing.value = false;
  Object.keys(editData).forEach((key) => (editData[key] = ""));
};

// Update promotion
const updatePromotion = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await axios.put(
      `http://localhost:3000/api/promotions/${editData.id}`,
      editData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update local promotions array
    const index = promotions.value.findIndex((p) => p.id === editData.id);
    if (index !== -1) {
      promotions.value[index] = { ...editData };
    }

    Swal.fire("Updated!", "Promotion updated successfully.", "success");
    cancelEdit();
  } catch (error) {
    console.error("Error updating promotion:", error);
    Swal.fire("Error", "Failed to update promotion. Please try again.", "error");
  }
};

// Simulate extracting user ID from token (you can use JWT decode library)
const getUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  return payload.user_id;
};

// Fetch promotions when the component mounts
onMounted(() => {
  fetchPromotions();
});

// Stop the auto-slide when the component is destroyed
onBeforeUnmount(() => {
  promotions.value.forEach((promotion) => stopAutoSlide(promotion));
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="shadow-lg rounded-lg p-6 mb-6 text-center">
      <h1 class="font-extrabold text-3xl text-white">My Promotions</h1>
    </div>

    <!-- Promotions List -->
    <div class="max-w-7xl mx-auto p-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center text-white font-semibold text-lg">
        <i class="fas fa-spinner fa-spin text-white"></i> Loading promotions...
      </div>

      <!-- Empty State -->
      <div v-if="promotions.length === 0 && !isLoading" class="text-center text-gray-500 text-lg">
        <i class="fas fa-info-circle"></i> You have no promotions. Start creating one!
      </div>

      <!-- Promotions Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="promotion in promotions" :key="promotion.id"
          class="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          @mouseenter="stopAutoSlide(promotion)"
          @mouseleave="startAutoSlide(promotion)">

          <!-- Promotion Image -->
          <div class="promotion-images">
            <img :src="getFullImageUrl(promotion.promotion_images[promotion.currentImageIndex])"
              alt="Promotion Image" class="promotion-image" />
          </div>

          <!-- Promotion Content -->
          <div class="p-4">
            <h2 class="font-bold text-lg text-teal-700 mb-2 line-clamp-1">
              {{ promotion.title }}
            </h2>
            <p class="text-gray-700 mb-3 line-clamp-1">{{ promotion.description }}</p>
            <div class="text-sm text-gray-500">
              <p><i class="far fa-calendar-alt"></i> Start: {{ formatDate(promotion.start_date) }}</p>
              <p><i class="far fa-calendar-check"></i> End: {{ formatDate(promotion.end_date) }}</p>
              <p><i class="fas fa-map-marker-alt"></i> {{ promotion.destination }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-gray-100 p-3 flex justify-between items-center">
            <button @click="editPromotion(promotion)"
              class="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 font-medium transition duration-300">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button @click="deletePromotion(promotion.id)"
              class="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition duration-300">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="isEditing" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="font-bold text-lg text-teal-700 mb-4">Edit Promotion</h2>
        <form @submit.prevent="updatePromotion">
          <input v-model="editData.title" type="text" placeholder="Title"
            class="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-teal-500" />
          <textarea v-model="editData.description" placeholder="Description"
            class="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-teal-500"></textarea>
          <input v-model="editData.start_date" type="date"
            class="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-teal-500" />
          <input v-model="editData.end_date" type="date"
            class="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-teal-500" />
          <div class="flex justify-end gap-2">
            <button type="submit"
              class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">
              <i class="fas fa-save"></i> Save
            </button>
            <button @click="cancelEdit" type="button"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300">
              <i class="fas fa-times"></i> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
