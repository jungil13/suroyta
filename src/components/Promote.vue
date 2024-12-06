<template>
  <div class="bg-teal-500 text-white py-10 animate-fade-in">
    <!-- Promotional Section -->
    <div class="max-w-4xl mx-auto flex items-center space-x-6">
      <div class="flex-1">
        <h2 class="text-3xl font-bold mb-4">Want to Promote Your Destination? Hotels, Resorts, and More!</h2>
        <p class="text-lg mb-4">
          Promote your hotel, resort, or destination with our platform and reach a wide audience looking to explore the
          best spots.
        </p>
        <p class="text-lg font-medium">Reach out to us today to get started!</p>
      </div>
      <div class="flex-none w-1/3">
        <img src="@/assets/img/promote.jpg" alt="Promote your destination" class="rounded-lg shadow-lg" />
      </div>
    </div>
  </div>

  <!-- Promotion Form -->
   <div class="max-w-3xl mx-auto p-6 bg-teal-50 shadow-md rounded-lg mt-12 mb-6 shadow-black animate-fade-in">
    <h1 class="text-2xl font-bold mb-4">Create Promotion</h1>
    <form @submit.prevent="submitPromotion" class="space-y-4">
      <!-- Title -->
      <div>
        <label for="title" class="block font-medium text-gray-700">Title</label>
        <input type="text" id="title" v-model="formData.title" placeholder="Enter promotion title"
          class="w-full p-2 border rounded-md" required />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block font-medium text-gray-700">Description</label>
        <textarea id="description" v-model="formData.description" placeholder="Enter promotion description" rows="4"
          class="w-full p-2 border rounded-md" required></textarea>
      </div>

      <!-- Destination -->
      <div>
        <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">
          Destination
        </label>
        <select v-model="destinationName" id="destination" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors">
          <option disabled value="">Select your destination</option>
          <optgroup label="Highly Urbanized City">
            <option value="Cebu City">Cebu City</option>
          </optgroup>
          <optgroup label="Independent Component City">
            <option value="Lapu-Lapu City">Lapu-Lapu City</option>
          </optgroup>
          <optgroup label="Component Cities">
            <option value="Carcar City">Carcar City</option>
            <option value="Danao City">Danao City</option>
            <option value="Naga City">Naga City</option>
            <option value="Talisay City">Talisay City</option>
            <option value="Toledo City">Toledo City</option>
          </optgroup>
          <optgroup label="Municipalities">
            <option value="Alcantara">Alcantara</option>
            <option value="Alcoy">Alcoy</option>
            <option value="Alegria">Alegria</option>
            <option value="Aloguinsan">Aloguinsan</option>
            <option value="Argao">Argao</option>
            <option value="Asturias">Asturias</option>
            <option value="Badian">Badian</option>
            <option value="Balamban">Balamban</option>
            <option value="Bantayan">Bantayan</option>
            <option value="Barili">Barili</option>
            <option value="Boljoon">Boljoon</option>
            <option value="Borbon">Borbon</option>
            <option value="Catmon">Catmon</option>
            <option value="Compostela">Compostela</option>
            <option value="Consolacion">Consolacion</option>
            <option value="Cordova">Cordova</option>
            <option value="Daanbantayan">Daanbantayan</option>
            <option value="Dalaguete">Dalaguete</option>
            <option value="Ginatilan">Ginatilan</option>
            <option value="Liloan">Liloan</option>
            <option value="Madridejos">Madridejos</option>
            <option value="Malabuyoc">Malabuyoc</option>
            <option value="Medellin">Medellin</option>
            <option value="Minglanilla">Minglanilla</option>
            <option value="Moalboal">Moalboal</option>
            <option value="Oslob">Oslob</option>
            <option value="Pilar">Pilar</option>
            <option value="Pinamungajan">Pinamungajan</option>
            <option value="Poro">Poro</option>
            <option value="Ronda">Ronda</option>
            <option value="Samboan">Samboan</option>
            <option value="San Fernando">San Fernando</option>
            <option value="San Francisco">San Francisco</option>
            <option value="San Remigio">San Remigio</option>
            <option value="Santa Fe">Santa Fe</option>
            <option value="Santander">Santander</option>
            <option value="Sibonga">Sibonga</option>
            <option value="Sogod">Sogod</option>
            <option value="Tabogon">Tabogon</option>
            <option value="Tabuelan">Tabuelan</option>
            <option value="Tuburan">Tuburan</option>
            <option value="Tudela">Tudela</option>
          </optgroup>
          <optgroup label="Islands">
            <option value="Bantayan Island">Bantayan Island</option>
            <option value="Camotes Islands">Camotes Islands</option>
            <option value="Malapascua Island">Malapascua Island</option>
          </optgroup>
        </select>
      </div>
      <!-- Map Section -->
      <div>
        <label class="block font-medium text-gray-700 mb-2">Select Location on Map</label>
        <div id="map" class="map-container"></div>
        <p class="text-sm text-gray-500 mt-2">Click on the map to set the location.</p>
        <div v-if="selectedLocation" class="mt-2">
          <p class="text-sm text-gray-700">
            Selected Location: Latitude {{ selectedLocation.lat }}, Longitude {{ selectedLocation.lng }}
          </p>
        </div>
      </div>

      <!-- Start Date -->
      <div>
        <label for="startDate" class="block font-medium text-gray-700">Start Date</label>
        <input type="date" id="startDate" v-model="formData.startDate" class="w-full p-2 border rounded-md" required />
      </div>

      <!-- End Date -->
      <div>
        <label for="endDate" class="block font-medium text-gray-700">End Date</label>
        <input type="date" id="endDate" v-model="formData.endDate" class="w-full p-2 border rounded-md" required />
      </div>

      <!-- Images -->
      <div>
        <label for="images" class="block font-medium text-gray-700">Upload Images (Max: 5)</label>
        <input type="file" id="images" @change="handleImageUpload" multiple accept="image/*"
          class="w-full p-2 border rounded-md" />
        <p class="text-sm text-gray-500 mt-2">Supported formats: JPG, JPEG, PNG</p>

        <!-- Image Previews -->
        <div class="flex flex-wrap gap-4 mt-4">
          <div v-for="(file, index) in selectedFiles" :key="index"
            class="relative w-24 h-24 border rounded-md overflow-hidden">
            <img :src="file.preview" alt="Preview" class="w-full h-full object-cover" />
            <button type="button" @click="removeImage(index)"
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
              ✕
            </button>
          </div>
        </div>
      </div>
      <!-- Submit Button -->
      <div>
        <button type="submit" :disabled="isLoading"
          class="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-300 disabled:opacity-50">
          {{ isLoading ? "Creating..." : "Create Promotion" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder';

// Reactive references for form data
const formData = ref({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
});
const selectedFiles = ref([]);
const isLoading = ref(false);
const destinationName = ref("");
const selectedLocation = ref(null); // Store selected lat/lng
const map = ref(null);
const marker = ref(null);

// Handle image upload
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);

  // Validate number of files
  if (selectedFiles.value.length + files.length > 5) {
    Swal.fire({
      icon: "error",
      title: "Too Many Files",
      text: "You can only upload up to 5 images.",
    });
    return;
  }

  // Add files to selectedFiles array with preview URLs
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedFiles.value.push({
        file,
        preview: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  });
};

// Remove image from selectedFiles
const removeImage = (index) => {
  selectedFiles.value.splice(index, 1);
};

// Submit the promotion
const submitPromotion = async () => {
  if (selectedFiles.value.length > 5) {
    Swal.fire({
      icon: "error",
      title: "Too Many Files",
      text: "You can only upload up to 5 images.",
    });
    return;
  }

  isLoading.value = true;

  try {
    const form = new FormData();
    form.append("title", formData.value.title);
    form.append("description", formData.value.description);
    form.append("startDate", formData.value.startDate);
    form.append("endDate", formData.value.endDate);
    form.append("destination", destinationName.value); // Send selected destination

    // Append selected images to form data
    selectedFiles.value.forEach((item) => {
      form.append("images", item.file);
    });

    // Append location if selected
    if (selectedLocation.value) {
      form.append("latitude", selectedLocation.value.lat);
      form.append("longitude", selectedLocation.value.lng);
    }

    // Send the request with the Bearer token for authorization
    const response = await axios.post("http://localhost:3000/api/promotions", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    Swal.fire({
      icon: "success",
      title: "Promotion Created",
      text: response.data.message,
    });

    // Reset form after successful submission
    formData.value = {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    };
    selectedFiles.value = [];
    destinationName.value = "";
    selectedLocation.value = null;
  } catch (error) {
    console.error(error); // Log the error for debugging

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "An error occurred.",
    });
  } finally {
    isLoading.value = false;
  }
};

// Initialize Leaflet map
const initializeMap = () => {
  map.value = L.map('map').setView([10.3157, 123.8854], 10); // Cebu, Philippines

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  // Add geocoder search control
  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false, // Prevent automatic marker placement
  })
    .on('markgeocode', (e) => {
      const { center } = e.geocode;
      if (marker.value) {
        marker.value.setLatLng(center); // Update existing marker
      } else {
        marker.value = L.marker(center).addTo(map.value); // Add new marker
      }
      map.value.setView(center, 13); // Zoom in on the searched location
      selectedLocation.value = { lat: center.lat, lng: center.lng }; // Store selected location
    })
    .addTo(map.value);

  // Add marker on map click (optional)
  map.value.on('click', (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    if (marker.value) {
      marker.value.setLatLng([lat, lng]);
    } else {
      marker.value = L.marker([lat, lng]).addTo(map.value);
    }

    selectedLocation.value = { lat, lng };
  });
};
onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
.map-container {
  height: 300px;
  width: 100%;
  border-radius: 8px;
}

.leaflet-control-geocoder {
  z-index: 1000;
  /* Ensure it appears above other elements */
}
</style>