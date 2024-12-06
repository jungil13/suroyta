<template>
  <div class="p-6 bg-white rounded-lg shadow-lg shadow-black">
    <h2 class="text-2xl font-bold mb-4">Comment Management</h2>
    <table class="min-w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2">Comment ID</th>
          <th class="border border-gray-300 px-4 py-2">Post Title</th>
          <th class="border border-gray-300 px-4 py-2">Commenter Name</th>
          <th class="border border-gray-300 px-4 py-2">Content</th>
          <th class="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments" :key="comment.comment_id" class="hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2">{{ comment.comment_id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comment.post_title }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comment.commenter_name }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ comment.content }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <button @click="deleteComment(comment.comment_id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const comments = ref([]);

// Fetch comments from the backend
const fetchComments = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage
    const response = await axios.get('http://localhost:3000/api/comments', {
      headers: {
        Authorization: token, // Send the token in the Authorization header
      },
    });
    comments.value = response.data; // Assuming the response data is an array of comments
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

onMounted(fetchComments);

const deleteComment = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    await axios.delete(`http://localhost:3000/api/comments/${id}`, {
      headers: {
        Authorization: token, // Send the token in the Authorization header
      },
    });
    comments.value = comments.value.filter(comment => comment.comment_id !== id); // Remove the comment from the local state
    console.log(`Deleted comment with ID: ${id}`);
  } catch (error) {
    console.error(`Error deleting comment with ID ${id}:`, error);
  }
};
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>