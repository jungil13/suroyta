<template>
    <div v-for="comment in comments" :key="comment.commentId" class="flex items-start border-b pb-4 mb-6">
      <!-- Profile Photo -->
      <img :src="comment.profilePhoto || 'default-profile-photo.jpg'" alt="User Profile"
        class="w-10 h-10 rounded-full mr-4" />
  
      <!-- Comment Content -->
      <div class="flex-grow">
        <div class="flex items-center justify-between">
          <!-- Username -->
          <p class="font-semibold">{{ comment.username }}</p>
  
          <!-- Date Created -->
          <p class="text-sm text-gray-500 ml-2">
            {{ new Date(comment.dateCreated).toLocaleDateString() }}
          </p>
        </div>
  
        <!-- Comment Content -->
        <p v-if="!editMode[comment.commentId]" class="text-gray-600 mt-2">{{ comment.content }}</p>
  
        <!-- Edit Comment Input -->
        <div v-else class="mt-2">
          <textarea v-model="editedComment" rows="2" class="w-full border rounded p-2"></textarea>
          <div class="mt-2">
            <button @click="updateComment(comment.commentId)" class="bg-blue-500 text-white px-4 py-1 rounded">
              Save
            </button>
            <button @click="cancelEdit(comment.commentId)" class="bg-gray-300 text-black px-4 py-1 rounded">
              Cancel
            </button>
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="flex mt-2 space-x-2">
          <button @click="enableEdit(comment.commentId, comment.content)" class="text-blue-500 hover:underline">
            Edit
          </button>
          <button @click="deleteComment(comment.commentId)" class="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  
  const comments = ref([]);
  const editMode = ref({});
  const editedComment = ref('');
  const postId = ref(1); // Example postId, replace with dynamic value if necessary
  
  // Fetch comments from API
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId.value}/comments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      comments.value = response.data;
    } catch (error) {
      console.error('Error fetching comments:', error.response ? error.response.data : error.message);
    }
  };
  
  // Enable edit mode for a specific comment
  const enableEdit = (commentId, content) => {
    editMode.value[commentId] = true;
    editedComment.value = content;
  };
  
  // Cancel editing
  const cancelEdit = (commentId) => {
    editMode.value[commentId] = false;
    editedComment.value = '';
  };
  
  // Update a comment
  const updateComment = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:3000/comments/${commentId}`,
        { content: editedComment.value },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
  
      // Update the comment locally
      const comment = comments.value.find((c) => c.commentId === commentId);
      if (comment) {
        comment.content = editedComment.value;
      }
  
      cancelEdit(commentId);
      Swal.fire('Success', 'Comment updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating comment:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'Failed to update comment.', 'error');
    }
  };
  
  // Delete a comment
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      // Remove the comment from the list
      comments.value = comments.value.filter((c) => c.commentId !== commentId);
      Swal.fire('Success', 'Comment deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting comment:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'Failed to delete comment.', 'error');
    }
  };
  
  // Fetch comments on mount
  onMounted(fetchComments);
  </script>
  
  