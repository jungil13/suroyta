<template>
  <div class="py-10 mt-20">
    <div class="max-w-4xl mb-2 mx-auto mt-20 p-6 bg-white rounded-lg border shadow-md shadow-black animate-fade-in">
      <!-- Promotion Title & Author Info -->
      <h1 class="text-4xl font-extrabold mb-6 text-teal-600">
        <i class="fas fa-bullhorn mr-2"></i> {{ promotion.title }}
      </h1>

      <div class="flex items-center mb-6">
        <img :src="getFullImageUrl(promotion.author_profile_photo)"
          :alt="`Profile photo of ${promotion.author_username || 'Unknown author'}`"
          class="w-16 h-16 rounded-full border-2 border-teal-500 mr-4" />
        <span class="text-lg font-semibold text-gray-700">
          <i class="fas fa-user-circle mr-2 text-teal-500"></i> {{ promotion.author_username || 'Unknown' }}
        </span>
      </div>

      <!-- Description & Destination -->
      <p class="mb-4 text-gray-700">
        <i class="fas fa-info-circle text-teal-500 mr-2"></i>
        <strong>Description:</strong> {{ promotion.description || 'No description available' }}
      </p>
      <p class="mb-4 text-gray-700">
        <i class="fas fa-map-marker-alt text-teal-500 mr-2"></i>
        <strong>Destination:</strong> {{ promotion.destination || 'No destination provided' }}
      </p>
      <p class="mb-6 text-gray-700">
        <i class="fas fa-calendar-alt text-teal-500 mr-2"></i>
        <strong>Date Range:</strong> {{ formatDate(promotion.start_date) }} - {{ formatDate(promotion.end_date) }}
      </p>

      <!-- Image Carousel -->
      <div v-if="promotion.images.length > 0" class="">
        <div class="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-snap-x snap-mandatory">
          <div v-for="(image, index) in promotion.images" :key="index"
            class="flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden shadow-md snap-start">
            <img :src="getFullImageUrl(image)" :alt="`Image ${index + 1} of ${promotion.title}`"
              class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Like Button -->
      <button @click="toggleLike" class="mt-6 px-6 py-2 text-black rounded-lg font-semibold transition duration-300"
        :class="promotion.isLiked ? 'text-red-600 hover:bg-red-600' : ''">
        <i :class="promotion.isLiked ? 'fas fa-heart' : 'far fa-heart'" class="mr-2 text-black text-xl"></i>
        {{ promotion.isLiked ? 'Unlike' : 'Like' }} <span>{{ promotion.likeCount }}</span>
      </button>

      <!-- Map Section -->
      <button @click="toggleMap"
        class="mb-4 px-4 py-2 border border-black text-black rounded-lg font-semibold transition duration-300">
        <i class="fas fa-map-marker-alt mr-2"></i>
        {{ isMapVisible ? 'Hide Map' : 'Show Map' }}
      </button>
      <div v-if="isMapVisible" class="map-container rounded-lg shadow-md overflow-hidden">
        <div id="map" class="w-full h-96"></div>
      </div>
    </div>
<!-- Rating Section -->

       <PromotionRatings :promotionId="id" />
    
    <!-- Comments Section -->
    <PromotionComments :promotionId="id" />
  </div>
</template>


<script>
import axios from "axios";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import PromotionComments from "./PromotionComments.vue";
import Swal from 'sweetalert2'; // Import SweetAlert2
import PromotionRatings from "./PromotionRatings.vue";

export default {
  name: "PromotionDetail",
  components: {
    PromotionComments,
    PromotionRatings,
  },
  data() {
    return {
      promotion: {
        isLiked: false, // Tracks if the user has liked the promotion
        likeCount: 0, // Total likes for the promotion
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        destination: "",
        latitude: null,
        longitude: null,
        images: [],
        author_username: "",
        author_profile_photo: "",
        rating: 4, // Default rating
      },
      isMapVisible: false, // Map visibility state
      marker: null, // Marker instance
      map: null, // Map instance
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async fetchPromotion() {
      const id = this.$route.params.id || this.id;
      try {
        const response = await axios.get(`http://localhost:3000/api/promotions/getallpromotions/${id}`);
        const promotionData = response.data;

        // Fallbacks for isLiked and likeCount
        this.promotion = {
          ...promotionData,
          isLiked: promotionData.isLiked ?? false,
          likeCount: promotionData.likeCount ?? 0,
        };
      } catch (error) {
        console.error("Error fetching promotion:", error);
        Swal.fire('Error', 'Failed to load promotion details. Please try again later.', 'error');
      }
    },
    async toggleLike() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Swal.fire('Error', 'You need to log in to perform this action.', 'error');
          return;
        }

        // Prepare the like/unlike action
        const action = this.promotion.isLiked ? "unlike" : "like";
        const response = await axios.post(
          "http://localhost:3000/api/posts/like",
          { promotionId: this.id, action },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update the promotion's like state and count based on response
        this.promotion.isLiked = action === "like";
        this.promotion.likeCount = response.data.likeCount;

        Swal.fire(
          'Success',
          `You have ${this.promotion.isLiked ? 'liked' : 'unliked'} the promotion.`,
          'success'
        );
      } catch (error) {
        console.error("Error toggling like:", error);

        const errorMessage =
          error.response?.status === 401
            ? 'You need to log in to perform this action.'
            : 'An error occurred. Please try again later.';
        Swal.fire('Error', errorMessage, 'error');
      }
    },
    toggleMap() {
      this.isMapVisible = !this.isMapVisible;

      if (this.isMapVisible) {
        this.$nextTick(this.initializeMap);
      } else if (this.map) {
        this.map.remove();
        this.map = null;
      }
    },
    getFullImageUrl(imagePath) {
      const baseUrl = "http://localhost:3000"; // Adjust the base URL as necessary
      return imagePath ? `${baseUrl}${imagePath}` : "/default-image.jpg";
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : "N/A";
    },
    initializeMap() {
      if (
        this.promotion.latitude &&
        this.promotion.longitude &&
        document.getElementById("map")
      ) {
        if (!this.map) {
          // Create the map only once
          this.map = L.map("map").setView(
            [this.promotion.latitude, this.promotion.longitude],
            13
          );

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap contributors",
          }).addTo(this.map);
        }

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        this.marker = L.marker([
          this.promotion.latitude,
          this.promotion.longitude,
        ])
          .addTo(this.map)
          .bindPopup(this.promotion.destination)
          .openPopup();

        setTimeout(() => {
          this.map.invalidateSize();
        }, 200);
      } else {
        console.error("Invalid location coordinates or map container not found");
      }
    },
  },
  mounted() {
    this.fetchPromotion();
  },
};
</script>
<style scoped>
.map-container {
  width: 100%;
  height: 400px;
}

/* Disable scoped styles for the map container */
#map {
  width: 100%;
  height: 400px;
}
</style>