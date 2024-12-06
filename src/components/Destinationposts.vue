<template>
  <div class="container mx-auto p-6 animate-fade-in">
    <div class="posts container p-6 mx-auto mt-20">
      <div class="mt-8"></div>
      <h2 class="text-4xl font-extrabold mb-8 text-center text-gray-100 transform hover:scale-105 transition-transform duration-300">
        Exploring {{ destination }}
      </h2>
      <div
        v-for="(post, index) in processedPosts"
        :key="post.id"
        class="flex items-start animate-fade-in bg-white shadow-md rounded-md p-4 mb-6"
      >
        <!-- Image Section -->
        <div class="w-1/4">
          <img
            :src="`http://localhost:3000${post.currentImageUrl}`"
            alt="Post Image"
            class="object-cover w-full h-32 rounded-md"
          />
        </div>

        <!-- Content Section -->
        <div class="w-3/4 ml-4">
          <!-- Title and Menu Section -->
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xl font-semibold text-teal-800">
              {{ post.title }}
            </h3>
            <!-- Three Dots Menu -->
            <div class="relative">
              <button @click="toggleMenu(post.id)" class="text-gray-500">
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div v-if="isMenuVisible(post.id)" class="absolute right-0 bg-white shadow-md rounded-md w-40 py-2 mt-2">
                <button class="block px-4 py-2 text-sm text-red-700" @click="openReportModal(post.id)">Report</button>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-gray-700 text-sm mb-3 line-clamp-2">
            {{ post.content }}
          </p>

          <!-- Stats Section -->
          <div class="flex items-center text-gray-500 text-sm space-x-4 mb-4">
            <div class="flex items-center">
              <i class="fas fa-star text-yellow-400 mr-1"></i> {{ post.likeCount }}
            </div>
            <div class="flex items-center">
              <i class="fas fa-thumbs-up text-blue-500 mr-1"></i> {{ post.likeCount }}
            </div>
            <div class="flex items-center">
              <i class="fas fa-comment-alt text-gray-400 mr-1"></i> {{ post.commentCount }}
            </div>
          </div>
          <p class="text-xs text-gray-500 mb-2">Destination :  {{ post.destination }}</p>
          <p class="text-xs text-gray-500">Author :  {{ post.username }}</p>
          <!-- View on Map Link -->
          <router-link
            :to="`/posts/${post?.id}`"
            class="flex justify-end items-center font-semibold text-blue-500"
          >
            <i class="fas fa-map-marker-alt mr-2"></i> View on Map
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
</template>


<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/axiosInstance";
import Swal from 'sweetalert2';

const route = useRoute();
const destination = ref(route.params.destination);
const posts = ref([]);
const visibleMenus = ref(new Set());
const reportReason = ref('');
const isModalOpen = ref(false);
const currentPostId = ref(null);


const processedPosts = computed(() => {
  return posts.value.map(post => {
    const imageUrls = post.image_url.split(',').map(url => url.trim());
    return {
      ...post,
      id: post.post_id, // Include post_id
      currentImageUrl: imageUrls[0],
      allImageUrls: imageUrls,
    };
  });
});

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

const toggleHide = (postId) => {
  console.log('Hide / Unhide post with id:', postId);
  // Add logic for hiding/unhiding the post here
};

const reportPost = (postId) => {
  console.log('Report post with id:', postId);
  // Add logic for reporting the post here
};

async function fetchPosts(dest) {
  try {
    const response = await axiosInstance.get(`/api/posts/destination/${dest}`);
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

watch(
  () => route.params.destination,
  (newDestination) => {
    destination.value = newDestination;
    fetchPosts(newDestination);
  }
);

onMounted(() => {
  fetchPosts(destination.value);
});

const viewOnMap = (post) => {
  alert(`View ${post.title} on map!`);
};
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

* {
  transition: all 0.3s ease;
}
</style>
