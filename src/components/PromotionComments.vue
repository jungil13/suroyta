<template>
  <div class="mt-10 max-w-4xl mx-auto bg-white shadow-md shadow-black rounded-lg p-6 animate-fade-in">
    <!-- Section Title -->
    <h2 class="text-2xl font-bold mb-4 text-teal-600">Promotion Comments</h2>

    <!-- Comment Form -->
    <div>
      <form @submit.prevent="submitComment" class="mb-6">
        <textarea
          v-model="newComment"
          rows="3"
          placeholder="Write a comment..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        ></textarea>
        <button
          type="submit"
          :disabled="isSubmitting || !newComment.trim()"
          class="mt-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          {{ isSubmitting ? "Submitting..." : "Submit Comment" }}
        </button>
      </form>
    </div>

    <!-- Comments List -->
    <div v-if="comments.length > 0">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="mb-4 border-b pb-4 flex items-center justify-between"
      >
        <div class="flex items-center">
          <!-- Profile Photo -->
          <img
            :src="comment.profilePhoto"
            alt="Profile Photo"
            class="w-10 h-10 rounded-full mr-3"
          />
          <!-- Comment Details -->
          <div class="p-2">
            <p class="font-semibold text-gray-700">{{ comment.username }}</p>
            <p class="text-gray-600">{{ comment.content }}</p>
            <p class="text-sm text-gray-400">{{ formatDate(comment.createdAt) }}</p>
          </div>
        </div>
        <!-- Report Button -->
        <button
          @click="openReportModal(comment.id)"
          class="text-red-600 hover:underline text-sm"
        >
          Report
        </button>
      </div>
    </div>
    <div v-else class="text-gray-500">No comments yet. Be the first to comment!</div>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// Props
const props = defineProps({
  promotionId: {
    type: Number,
    required: true,
  },
});

// Reactive state
const comments = ref([]);
const newComment = ref("");
const isSubmitting = ref(false);
const isLoggedIn = ref(false);

// Report Modal State
const isModalOpen = ref(false);
const reportReason = ref("");
const currentCommentId = ref(null);

// Fetch comments
const fetchComments = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/promotions/${props.promotionId}/getcomments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    comments.value = response.data.comments.map((comment) => ({
      id: comment.comment_id,
      content: comment.content,
      createdAt: comment.comment_created_at,
      username: comment.username || "Anonymous",
      profilePhoto: comment.profile_photo
        ? `http://localhost:3000${comment.profile_photo.trim()}`
        : "https://example.com/default-profile-photo.jpg",
    }));

    isLoggedIn.value = true;
  } catch (error) {
    console.error("Error fetching comments:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to fetch comments. Please try again later.",
    });
  }
};

// Open Report Modal
const openReportModal = (commentId) => {
  currentCommentId.value = commentId;
  isModalOpen.value = true;
};

// Close Report Modal
const closeReportModal = () => {
  isModalOpen.value = false;
  reportReason.value = "";
};

// Submit Report
const submitReport = async () => {
  if (!reportReason.value.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Missing Reason",
      text: "Please provide a reason for reporting the comment.",
    });
    return;
  }

  try {
    await axios.post(
      "http://localhost:3000/api/reports/create",
      {
        comment_id: currentCommentId.value,
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
      text: "Comment reported successfully. Admins will review you report and will take actions.",
    });

    closeReportModal();
  } catch (error) {
    console.error("Error reporting comment:", error);
    Swal.fire({
      icon: "error",
      title: "Report Failed",
      text: "Failed to report the comment. Please try again.",
    });
  }
};

// Submit comment
const submitComment = async () => {
  if (!newComment.value.trim()) return;

  isSubmitting.value = true;

  try {
    const response = await axios.post(
      `http://localhost:3000/api/promotions/${props.promotionId}/comment`,
      { content: newComment.value },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const newCommentData = {
      id: response.data.comment_id,
      content: response.data.content,
      createdAt: response.data.comment_created_at,
      username: response.data.username || "Anonymous",
      profilePhoto: response.data.profile_photo
        ? `http://localhost:3000${response.data.profile_photo.trim()}`
        : "https://example.com/default-profile-photo.jpg",
    };

    comments.value.unshift(newCommentData);
    newComment.value = "";

    Swal.fire({
      icon: "success",
      title: "Comment Posted!",
      text: "Your comment was successfully posted",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Error submitting comment:", error);
    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: "Failed to submit your comment. Please try again later.",
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

// Lifecycle Hook
onMounted(() => {
  fetchComments();
});
</script>
