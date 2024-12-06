<template>
  <section class="mt-20 container p-6 mx-auto">
    <div class="mt-16"></div>
    <div class="text-center mb-16">
      <p class="font-extrabold text-5xl text-white mb-4">
        <i class="fas fa-plane-departure mr-2"></i> Begin Your Journey
      </p>
      <p class="font-medium text-lg text-gray-100">Browse famous places in Cebu</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
      <div
        v-for="(post, index) in posts"
        :key="post.id"
        class="flex items-center bg-white rounded-lg p-3 shadow-md h-auto animate-fade-in"
      >
        <!-- Image Section -->
        <img
          :src="post.currentImageUrl"
          :alt="post.title"
          class="w-32 h-32 object-cover rounded-l-lg"
        />

        <!-- Content Section -->
        <div class="flex-1 p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-lg text-teal-700">{{ post.title }}</h3>
            <!-- Three Dots Menu -->
            <div class="relative">
              <button @click="toggleMenu(post.id)" class="text-gray-500">
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div v-if="isMenuVisible(post.id)" class="absolute right-0 bg-white shadow-md shadow-black rounded-md w-40 py-2 mt-2">
                <button class="block px-4 py-2 text-sm text-red-700" @click="openReportModal(post.id)">Report</button>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600">{{ post.content }}</p>
          <div class="flex items-center space-x-4 mt-2 mb-2">
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
          <!-- Actions Section -->
          <p class="text-xs text-gray-500 mb-2">Destination :  {{ post.destination }}</p>
          <p class="text-xs text-gray-500">Author :  {{ post.author }}</p>
          <router-link
            :to="`/posts/${post?.id}`"
            class="flex justify-end items-center font-semibold"
          >
            <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i> Map
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const posts = ref([]);
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

// Check if menu is visible
const isMenuVisible = (postId) => {
  return visibleMenus.value.has(postId);
};

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/posts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    posts.value = response.data.map((post) => {
      const imageUrls = post.image_url.split(',').map((url) => `http://localhost:3000${url.trim()}`);
      return {
        id: post.post_id,
        title: post.title,
        content: post.content,
        currentImageUrl: imageUrls[0],
        date: new Date(post.created_at).toLocaleDateString(),
        likes: post.likes || 0,
        likeCount: post.likeCount || 0,
        views: post.views || 0,
        category: post.category_name,
        destination: post.destination,
        authorbio: post.author_bio || 'No bio available',
        commentCount: post.commentCount || 0,
        author : post.author,
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
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
    await axios.post(
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
      text: 'Post reported successfully. Admins will review you report and will take actions.',
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

onMounted(() => {
  fetchPosts();
});
</script>


<style scoped>
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
