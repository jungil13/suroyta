<template>
  <section class="animate-fade-in min-h-screen p-8 shadow-md shadow-black rounded-lg p-6">
    <div class="mt-16"></div>
    <div class="max-w-4xl mx-auto bg-white p-6 shadow-md shadow-black rounded-xl mb-6">
      <h1 class="font-extrabold text-4xl mb-4">{{ post.title }}</h1>
      <div class="flex items-center mb-4">
        <img :src="post.authorImage" class="w-12 h-12 rounded-full mr-3" alt="Author" />
        <div>
          <p class="text-gray-700 font-semibold">{{ post.author }}</p>
          <p class="text-gray-500 text-sm">{{ post.date }}</p>
        </div>
      </div>

      <!-- Image Carousel -->
      <div class="relative w-full h-auto max-h-96 mb-4">
        <img :src="post.currentImageUrl" class="w-full h-auto max-h-96 object-cover rounded-lg" alt="Post Image" />
        <button v-if="post.imageUrls.length > 1" @click="prevImage"
          class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">&lt;</button>
        <button v-if="post.imageUrls.length > 1" @click="nextImage"
          class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">&gt;</button>
      </div>
      <p class="text-gray-700 mb-4">{{ post.content }}</p>
      <div class="flex justify-between items-center mt-4">
        <button @click="likePost(post.id)"
          class="border border-black text-black font-semibold text-md py-1 px-3 rounded hover:bg-blue-600 transition duration-300">
          <i class="fas" :class="post.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
          {{ post.liked ? 'Unlike' : 'Like' }} <span class="ml-1">{{ post.likeCount }}</span>
        </button>
      </div>
      <!-- Map Section -->
      <div class="my-6">
        <button @click="toggleMap"
          class="border border-black text-black py-1 px-4 rounded px-4 py-2 rounded shadow transition duration-300">
          <i class="fas fa-map-marker-alt mr-2"></i>{{ isMapVisible ? 'Hide Map' : 'Show Map' }}
        </button>
        <div v-if="isMapVisible" id="map"
          class="map-container my-6 w-full h-80 rounded-lg shadow-md shadow-black overflow-hidden"></div>
      </div>
    </div>
    <div v-if="post.id">
      <PostRatings :postId="post.id" />
    </div>
    <div v-else>
      <p>Loading post...</p>
    </div>
    <!-- comments -->
    <div class="max-w-4xl mx-auto bg-white p-6 shadow-md shadow-black rounded-xl">
    <h2 class="font-bold text-2xl mb-6 text-gray-800">Comments</h2>

    <!-- Comments Section -->
    <div v-for="comment in comments" :key="comment.commentId" class="flex items-start border-b pb-4 mb-6 space-x-4">
      <!-- Profile Photo -->
      <img :src="comment.profilePhoto || 'default-profile-photo.jpg'" alt="User Profile"
        class="w-12 h-12 rounded-full object-cover shadow-md" />

      <!-- Comment Content -->
      <div class="flex-grow">
        <div class="flex items-center justify-between">
          <p class="font-semibold text-gray-800">{{ comment.username }}</p>
          <button
            @click="openReportModal(comment.commentId)"
            class="text-red-600 text-sm hover:underline"
          >
            Report
          </button>
        </div>
        <p class="text-gray-600 mt-2 text-sm leading-relaxed mb-4">{{ comment.content }}</p>
        <p class="text-sm text-gray-500">{{ new Date(comment.dateCreated).toLocaleDateString() }}</p>
      </div>
    </div>

    <!-- Add Comment Form -->
    <form @submit.prevent="addComment" class="mt-8">
      <textarea v-model="newComment" placeholder="Add a comment..."
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        rows="4" required></textarea>
      <button type="submit"
        class="bg-teal-700 text-white py-2 px-6 rounded-lg mt-4 hover:bg-blue-600 focus:ring-4 focus:ring-teal-300 transition duration-300">
        Submit
      </button>
    </form>

    <!-- Report Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-lg font-bold text-teal-700 mb-4">Report Comment</h3>
        <textarea
          v-model="reportReason"
          placeholder="Enter your reason for reporting"
          class="w-full p-2 border border-gray-300 rounded-lg"
          rows="4"
        ></textarea>
        <div class="flex justify-between mt-4">
          <button
            @click="submitReport"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Submit Report
          </button>
          <button
            @click="closeReportModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is installed
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css';
import PostRatings from './PostRatings.vue';


const reportReason = ref('');
const isModalOpen = ref(false);
const currentCommentId = ref(null);
const isMapVisible = ref(false);
const mapInstance = ref(null); // Declare mapInstance as a reactive reference


// Report Modal Logic
const openReportModal = (commentId) => {
  currentCommentId.value = commentId;
  isModalOpen.value = true;
};

const closeReportModal = () => {
  isModalOpen.value = false;
  reportReason.value = '';
};

const submitReport = async () => {
  if (!reportReason.value.trim()) {
    Swal.fire('Warning', 'Please provide a reason for reporting.', 'warning');
    return;
  }

  try {
    await axios.post(
      'http://localhost:3000/api/reports/create',
      {
        comment_id: currentCommentId.value,
        reason: reportReason.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    Swal.fire('Success', 'Comment reported successfully.', 'success');
    closeReportModal();
  } catch (error) {
    console.error('Error reporting comment:', error);
    Swal.fire('Error', 'Failed to report comment.', 'error');
  }
};


const route = useRoute();
const post = ref({
  id: null,
  title: '',
  content: '',
  imageUrls: [],
  currentImageUrl: '',
  author: '',
  authorImage: '',
  date: '',
  likes: 0,
  views: 0,
  likeCount: 0, // Initialize likeCount
  liked: false, // Track if the post is liked
  latitude: null,
  longitude: null,
});
const comments = ref([]);
const newComment = ref('');
const isLoggedIn = ref(false); // Assuming false by default

const fetchPost = async () => {
  const postId = route.params.id;
  try {
    const response = await axios.get(`http://localhost:3000/api/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    isLoggedIn.value = true; // Set logged in status
    const imageUrls = response.data.image_url.split(',').map(url => `http://localhost:3000${url.trim()}`);

    const authorImage = response.data.author_image 
      ? `http://localhost:3000${response.data.author_image.trim()}`
      : 'https://example.com/default-profile-photo.jpg'; // Use a default image URL

    post.value = {
      id: response.data.post_id,
      title: response.data.title,
      content: response.data.content,
      imageUrls,
      currentImageUrl: imageUrls[0] || '',
      author: response.data.author,
      authorImage,
      date: new Date(response.data.created_at).toLocaleDateString(),
      likes: response.data.likes || 0,
      views: response.data.views || 0,
      likeCount: response.data.likeCount || 0,
      liked: false,
      longitude: response.data.longitude, // Include longitude
      latitude: response.data.latitude, // Include latitude
    };

    // Initialize map after setting longitude and latitude
    if (post.value.longitude && post.value.latitude) {
      initMap(post.value.latitude, post.value.longitude);
    }

    await fetchComments(postId);
  } catch (error) {
    console.error('Error fetching post:', error);
    Swal.fire('Error', 'Failed to fetch post details.', 'error');
  }
};


const initMap = (latitude, longitude) => {
  if (!latitude || !longitude) {
    console.error('Invalid coordinates provided for map initialization.');
    return;
  }

  const mapContainer = document.getElementById('map');
  if (!mapContainer) {
    console.error('Map container not found.');
    return;
  }

  if (!mapInstance.value) {
    mapInstance.value = L.map('map').setView([latitude, longitude], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance.value);

    // Add a marker for the post location
    L.marker([latitude, longitude]).addTo(mapInstance.value)
      .bindPopup('Post Location')
      .openPopup();
  }
};

// Destroy the map instance
const destroyMap = () => {
  if (mapInstance.value) {
    mapInstance.value.remove(); // Use mapInstance.value to call remove()
    mapInstance.value = null; // Set mapInstance to null after removal
  }
};

// Method to toggle the map visibility
const toggleMap = async () => {
  isMapVisible.value = !isMapVisible.value;

  if (isMapVisible.value) {
    await nextTick(); // Wait for the DOM to render the map container
    initMap(post.value.latitude, post.value.longitude);
  } else {
    destroyMap(); // Cleanup the map instance when hiding
  }
};

const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    isLoggedIn.value = true; // Set logged in status
    comments.value = response.data.map(comment => {
      const profilePhoto = comment.profilePhoto 
        ? `http://localhost:3000${comment.profilePhoto.trim()}`
        : 'https://example.com/default-profile-photo.jpg'; // Use a default image URL

      return {
        ...comment,
        profilePhoto, // Use the actual profile photo or fallback
      };
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    Swal.fire('Error', 'Failed to fetch comments.', 'error');
  }
};

const likePost = async (postId) => {
  try {
    const response = await axios.post('http://localhost:3000/api/posts/like', { postId }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    post.value.likeCount = response.data.likeCount; // Update the likeCount with the response from the server
    post.value.liked = !post.value.liked; // Toggle the liked state
  } catch (error) {
    console.error('Error toggling like:', error);
    Swal.fire('Error', 'Failed to toggle like.', 'error');
  }
};

const addComment = async () => {
  if (newComment.value.trim()) {
    const postId = post.value?.id; // Safely access post ID

    if (!postId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Post ID is missing.',
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/posts/${postId}/comments`,
        { content: newComment.value },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        comments.value.push({
          commentId: response.data.commentId,
          postId,
          userId: response.data.userId,
          content: response.data.content,
          dateCreated: new Date().toISOString(), // Set the current date
          username: 'Your Username', // Replace with actual username if available
          profilePhoto: 'default-profile-photo.jpg', // Replace with actual profile photo if available
        });
        newComment.value = ''; // Clear the input field
        Swal.fire({
          icon: 'success',
          title: 'Comment Added',
          text: 'Your comment was successfully added!',
        });
        window.location.reload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Comment',
          text: 'An unexpected error occurred. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'An unexpected error occurred. Please try again.',
      });
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Empty Comment',
      text: 'Please enter a comment before submitting.',
    });
  }
};
const prevImage = () => {
  const currentIndex = post.value.imageUrls.indexOf(post.value.currentImageUrl);
  const prevIndex = (currentIndex - 1 + post.value.imageUrls.length) % post.value.imageUrls.length;
  post.value.currentImageUrl = post.value.imageUrls[prevIndex];
};

const nextImage = () => {
  const currentIndex = post.value.imageUrls.indexOf(post.value.currentImageUrl);
  const nextIndex = (currentIndex + 1) % post.value.imageUrls.length;
  post.value.currentImageUrl = post.value.imageUrls[nextIndex];
};

onMounted(() => {
  fetchPost();
});
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