<template>
    <div class="p-6 bg-white rounded-lg shadow-lg shadow-black">
      <h2 class="text-2xl font-bold mb-4">Posts Management</h2>
      <table class="min-w-full border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Author</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Category</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Destination</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Content</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.post_id" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-4 py-2">{{ post.post_id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ post.title }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ post.author }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ post.category_name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ post.destination }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ post.content }}</td>
            <td class="border border-gray-300 px-4 py-2 space-y-2">
              <button @click="editPost(post.post_id)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deletePost(post.post_id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                <i class="fas fa-trash"></i>
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
  
  const posts = ref([]);
  
  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts'); // Adjust the URL as needed
      posts.value = response.data; // Assuming the response data is an array of posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  onMounted(fetchPosts);
  
  const editPost = (id) => {
    console.log(`Edit post with ID: ${id}`);
    // Implement edit functionality here
  };
  
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`); // Adjust the URL as needed
      posts.value = posts.value.filter(post => post.post_id !== id); // Remove the post from the local state
      console.log(`Deleted post with ID: ${id}`);
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
    }
  };
  </script>
  
  <style scoped>
  /* No additional styles needed as Tailwind CSS is used */
  </style>