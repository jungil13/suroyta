<template>
    <section class="grid min-h-screen p-8 place-items-center bg-white">
      <div>
        <p class="font-extrabold text-4xl">Most Viewed Posts</p>
      </div>
      <div class="container grid grid-cols-1 gap-8 my-auto lg:grid-cols-2">
        <div
          v-for="post in posts"
          :key="post.id"
          class="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none grid gap-2 item sm:grid-cols-2"
        >
          <div class="relative bg-clip-border rounded-xl shadow-md shadow-black overflow-hidden bg-white text-gray-700 shadow-lg m-0">
            <img :src="post.imageUrl" :alt="post.title" class="object-cover w-full h-48" />
          </div>
          <div class="p-6 px-2 sm:pr-6 sm:pl-4">
            <p class="block antialiased font-sans text-sm font-light leading-normal text-inherit mb-4 !font-semibold">{{ post.category }}</p>
            <router-link :to="`/posts/${post.id}`" class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700">{{ post.title }}</router-link>
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">{{ post.content }}</p>
            <div class="flex items-center gap-4">
              <img :src="post.authorImage" class="inline-block relative object-cover object-center !rounded-full w-12 h-12 rounded-lg" />
              <div>
                <p class="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900 mb-0.5 !font-semibold">{{ post.author }}</p>
                <p class="block antialiased font-sans text-sm leading-normal text-gray-700 font-normal">{{ post.date }}</p>
              </div>
            </div>
            <div class="flex justify-between items-center mt-4">
              <button
                @click="likePost(post.id)"
                class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
              >
                Like <span class="ml-1">{{ post.likes }}</span>
              </button>
              <span class="text-gray-600">Views: {{ post.views }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const posts = ref([]);
  
  // Mock function to fetch posts (replace with actual API call)
  const fetchPosts = async () => {
    // Simulating an API call
    posts.value = [
      {
        id: 1,
        title: 'Exploring the Beaches of Cebu',
        content: 'Cebu is known for its beautiful beaches...',
        imageUrl: 'https://boombox.social/wp-content/uploads/2023/09/zany-jadraque-ply-6rPZKSA-unsplash.jpg',
        author: 'John Doe',
        authorImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84bae58b8106fcf872c21dc549',
        date: '2022-08-15',
        likes: 10,
        views: 100,
        category: 'Travel',
      },
      {
        id: 2,
        title: 'The Best Cityscapes in Cebu',
        content: 'Discover the vibrant city life in Cebu...',
        imageUrl: 'https://boombox.social/wp-content/uploads/2023/09/zany-jadraque-ply-6rPZKSA-unsplash.jpg',
        author: 'Jane Smith',
        authorImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84bae58b8106fcf872c21dc549',
        date: '2022-09-02',
        likes: 5,
        views: 80,
        category: 'City',
      },
      {
        id: 3,
        title: 'Nature Trails and Landscapes',
        content: 'Cebu offers stunning landscapes and trails...',
        imageUrl: 'https://boombox.social/wp-content/uploads/2023/09/zany-jadraque-ply-6rPZKSA-unsplash.jpg',
        author: 'Alex Johnson',
        authorImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84bae58b8106fcf872c21dc549',
        date: '2022-09-20',
        likes: 8,
        views: 120,
        category: 'Nature',
      },
      // Add more posts as needed
    ];
  };
  
  const likePost = (postId) => {
    const post = posts.value.find(p => p.id === postId);
    if (post) {
      post.likes++;
    }
  };
  
  onMounted(() => {
    fetchPosts();
  });
  </script>
  
  <style scoped>
  /* Add any additional styles for the posts page here */
  </style>