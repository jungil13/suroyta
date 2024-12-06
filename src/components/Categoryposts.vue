<template>
  <section class="container p-6 mx-auto">
    <div class="mt-20 container p-12 mx-auto px-4">
      <div class=""></div>
      <h2
        class="text-4xl font-extrabold mb-8 text-center text-gray-100 transform hover:scale-105 transition-transform duration-300">
        {{ category }} Destinations
      </h2>

      <div v-if="errorMessage" class="text-center text-red-500">
        <p>{{ errorMessage }}</p>
      </div>

      <div v-else-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
        <div v-for="(post, index) in processedPosts" :key="post.id"
          class="flex items-center bg-white rounded-lg p-3 shadow-md h-auto animate-fade-in">
          <!-- Image Section -->
          <div class="relative rounded-t-xl overflow-hidden mb-4">
            <img :src="`http://localhost:3000${post.currentImageUrl}`" :alt="post.title"
              class="w-32 h-32 object-cover rounded-l-lg" />
          </div>

          <!-- Content Section -->
          <div class="flex-1 p-4">
            <div class="flex items-center justify-between mb-2">
              <!-- Post Title -->
              <h3 class="text-xl font-bold text-gray-800 mb-2 hover:text-red-800 transition-colors duration-300">
                {{ post.title }}
              </h3>
              <!-- Three Dots Menu -->
              <div class="relative">
                <button @click="toggleMenu(post.id)" class="text-gray-500">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div v-if="isMenuVisible(post.id)"
                  class="absolute right-0 bg-white shadow-md shadow-black rounded-md w-40 py-2 mt-2">
                  <button class="block px-4 py-2 text-sm text-red-700" @click="openReportModal(post.id)">Report</button>
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-600">{{ post.content }}</p>
            <div class="flex items-center space-x-4 mt-2">
              <div class="flex items-center text-gray-700 text-sm">
                <i class="fas fa-star text-yellow-500 mr-1"></i> 345
              </div>
              <div class="flex items-center text-gray-700 text-sm">
                <i class="fas fa-thumbs-up mr-1"></i> {{ post.likeCount }}
              </div>
              <div class="flex items-center text-gray-700 text-sm">
                <i class="fas fa-comment mr-1"></i> {{ post.commentCount }}
              </div>
            </div>
            <p class="text-xs text-gray-500 bl mt-2">Destination : {{ post.destination }}</p>
            <p class="text-xs text-gray-500 bl mt-2">Author : {{ post.username }}</p>
            <router-link :to="`/posts/${post?.id}`" class="flex justify-end items-center font-semibold">
              <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i> Map
            </router-link>
          </div>
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
import { ref, onMounted, watch, computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/axiosInstance";
import Swal from 'sweetalert2';

const route = useRoute();
const category = ref(route.params.category || "default"); // Fallback to 'default'
const posts = ref([]);
const errorMessage = ref("");
const visibleMenus = ref(new Set());
const reportReason = ref('');
const isModalOpen = ref(false);
const currentPostId = ref(null);


const toggleMenu = (postId) => {
  if (visibleMenus.value.has(postId)) {
    visibleMenus.value.delete(postId);
  } else {
    visibleMenus.value.add(postId);
  }
};

const isMenuVisible = (postId) => {
  return visibleMenus.value.has(postId);
};

const toggleHide = (postId) => {
  console.log('Hide / Unhide post with id:', postId);
  // Add logic for hiding/unhiding the post here
};

const reportPost = (postId) => {
  console.log('Report post with id:', postId);
  // Add logic for reporting the post here
};

const openReportModal = (postId) => {
  currentPostId.value = postId;
  isModalOpen.value = true;
};

// Close Report Modal
const closeReportModal = () => {
  isModalOpen.value = false;
  reportReason.value = '';
};

const submitReport = async () => {
  if (!reportReason.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Reason',
      text: 'Please provide a reason for reporting the post.',
    });
    return;
  }

  try {
    await axiosInstance.post(
      'http://localhost:3000/api/reports/create',
      {
        post_id: currentPostId.value,
        reason: reportReason.value
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    
    Swal.fire({
      icon: 'success',
      title: 'Report Submitted',
      text: 'Post reported successfully.',
    });

    closeReportModal();  // Close the modal after reporting
  } catch (error) {
    console.error('Error reporting post:', error);

    Swal.fire({
      icon: 'error',
      title: 'Report Failed',
      text: 'Failed to report the post. Please try again.',
    });
  }
};

const processedPosts = computed(() =>
  posts.value.map((post) => {
    const imageUrls = post.image_url.split(",").map((url) => url.trim());
    return {
      ...post,
      id: post.post_id,
      currentImageUrl: imageUrls[0],
      allImageUrls: imageUrls,
    };
  })
);

async function fetchPosts(_cat) {
  console.log(`Fetching posts for category: ${_cat}`); // Log the category being fetched
  try {
    const response = await axiosInstance.get(`/api/posts/category/${_cat}`);
    console.log("Response received from API:", response.data); // Log the raw data from the API
    if (response.data.length === 0) {
      console.warn(`No posts found for category: ${_cat}`); // Log a warning if no data is returned
    }
    posts.value = response.data;
    errorMessage.value = ""; // Clear previous errors
  } catch (error) {
    console.error("Error fetching posts:", error);
    console.debug("Error details:", error.response?.data || error.message); // Detailed error log
    posts.value = [];
    errorMessage.value = "Failed to fetch posts. Please try again later.";
  }
}


const stopWatching = watch(
  () => route.params.category,
  (newCategory) => {
    const updatedCategory = newCategory || "default";
    category.value = updatedCategory;
    fetchPosts(updatedCategory);
  }
);

onMounted(() => {
  fetchPosts(category.value);
});

onUnmounted(() => {
  stopWatching();
});
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Optional: Add hover effect for images */
.post-image:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Optional: Add smooth transition for all animations */
* {
  transition: all 0.3s ease;
}
</style>