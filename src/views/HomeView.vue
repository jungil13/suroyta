<template>
  <section id="home" class="mt-6 relative h-screen p-6 bg-gray-100 mb-1 shadow-md shadow-black">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/30 z-10"></div>

    <!-- Image Slideshow -->
    <div class="absolute inset-0 overflow-hidden">
      <transition name="fade" mode="out-in">
        <img :src="images[currentImage]" alt="Slideshow Image" class="w-full h-full object-cover" />
      </transition>
    </div>

    <!-- Content -->
    <div
      class="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center animate-fade-in">
      <!-- Main Header -->
      <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6">
        Hi {{ username }}! <br />
        Plan better with <span class="text-teal-300">Suroy - Ta</span>
      </h1>

      <!-- Subtext -->
      <p class="text-lg md:text-2xl text-white mb-8">
        Let's explore and visit the famous tourist attractions in Cebu
      </p>

      <div
    class="flex flex-col sm:flex-row w-full max-w-2xl mb-1 items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-10 p-2 rounded-full shadow-lg"
  >
    <!-- Search Input -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Where to?"
      class="flex-1 pl-20 pr-12 py-2 sm:py-3 text-sm sm:text-base rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-100 shadow-md shadow-black"
    />

    <!-- Search Button -->
    <button
      @click="handleSearch"
      class="bg-teal-600 text-white px-6 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full shadow-md shadow-black hover:bg-teal-700 transition flex items-center justify-center space-x-2"
    >
      <span class="material-symbols-outlined text-lg sm:text-xl">search</span>
      <span>Search</span>
    </button>
  </div>

  <div class="bg-transparent p-6 rounded-xl shadow-md">
    <h2 class="text-3xl font-bold text-center mb-12 text-white">Why Suroy - Ta?</h2>
    <h2 class="text-md py-2 font-bold text-center mb-12 text-white">Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Amet, facere error? Nulla, rerum aliquam inven</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-700">
      <div class="flex flex-col items-center text-center rounded-xl p-6 shadow-md shadow-black bg-white">
        <i class="fa-solid fa-headset text-4xl text-black text-pink-600 rounded-full mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">24/7 Customer Support</h3>
        <p>No matter the time zone, we’re here to help.</p>
      </div>
      <div class="rounded-xl flex flex-col items-center text-center p-6 shadow-md shadow-black bg-white">
        <i class="fa-solid fa-gift text-4xl text-blue-500 mb-4 "></i>
        <h3 class="text-lg font-semibold mb-2">Earn Rewards</h3>
        <p>Explore, earn, redeem, and repeat with our loyalty program.</p>
      </div>
      <div class="rounded-xl flex flex-col items-center text-center p-6 shadow-md shadow-black bg-white">
        <i class="fa-solid fa-star text-4xl text-yellow-500 mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">Millions of Reviews</h3>
        <p>Plan and book with confidence using reviews from fellow travelers.</p>
      </div>
      <div class=" rounded-xl flex flex-col items-center text-center p-6 shadow-md shadow-black bg-white">
        <i class="fa-solid fa-calendar-alt text-4xl text-blue-400 mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">Plan Your Way</h3>
        <p>Stay flexible with free cancellation and the option to reserve now and pay later at no additional cost.</p>
      </div>
    </div>
  </div>
    </div>
  </section>
  <section class="bg-emerald-50 p-8 shadow-md shadow-black mb-1">
  <h1 class="text-center text-4xl font-extrabold mb-4">Promote your Hotels, Restaurants</h1>
  <h1 class="text-center text-4xl font-semibold mb-4"> or any place.</h1>
  <p class="text-center text-lg font-default mb-6">
    promote your place and let it bloom
  </p>
</section>
  <section class="bg-white mb-1">
    <LatestPosts :posts="latestPosts" />
  </section>
  <section class="bg-emerald-50 p-6 shadow-md shadow-black mb-1">
  <h1 class="text-center text-4xl font-extrabold mb-4">Enjoy browsing your Favorite</h1>
  <h1 class="text-center text-4xl font-semibold mb-4">Destinations</h1>
  <p class="text-center text-lg font-default">
    Post a destination and let the viewers 
  </p>
  <p class="text-center text-lg font-default">rate and review your beloved</p>
  <p class="text-center text-lg font-default">place</p>
</section>
  <section class="bg-white">
    <TopRatedPosts />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import LatestPosts from "./LatestPosts.vue";
import { useRoute } from "vue-router";
import TopRatedPosts from "./TopRatedPosts.vue";
import Swal from "sweetalert2";


const route = useRoute();
const activeLink = ref("");

const images = [
  new URL('@/assets/img/35.jpg', import.meta.url).href,
  new URL('@/assets/img/bitch.jpg', import.meta.url).href,
  new URL('@/assets/img/cclex.jpg', import.meta.url).href,
];
const currentImage = ref(0);
const searchQuery = ref("");
const latestPosts = ref([]);
let intervalId;

const changeImage = () => {
  currentImage.value = (currentImage.value + 1) % images.length;
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Trigger prank alert
    Swal.fire({
      icon: "warning",
      title: "It's a prank!",
      text: "You thought this was a real search? 😄",
    });
    // Clear search query
    searchQuery.value = "";
  } else {
    // Notify user if input is empty
    Swal.fire({
      icon: "info",
      title: "Empty Search",
      text: "Please enter a destination first.",
    });
  }
};

const fetchLatestPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/posts/latest");
    latestPosts.value = response.data.map((post) => ({
      id: post.post_id,
      title: post.title,
      imageUrl: `http://localhost:3000${post.image_url.split(",")[0]}`,
      excerpt: post.content.substring(0, 100) + "...",
      author: post.author,
      authorImage: `http://localhost:3000${post.author_image.split(",")[0]}`,
    }));
  } catch (error) {
    console.error("Error fetching latest posts:", error);
  }
};

onMounted(() => {
  fetchLatestPosts();
  intervalId = setInterval(changeImage, 5000);
  activeLink.value = route.name;
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes glow {
  0% {
    text-shadow: 0 0 5px rgba(247, 246, 243, 0.8), 0 0 15px rgba(255, 255, 255, 0.7);
  }

  50% {
    text-shadow: 0 0 10px rgb(247, 247, 247), 0 0 30px rgba(250, 250, 250, 0.8);
  }

  100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.7);
  }
}

.animate-glow {
  animation: glow 1.5s infinite alternate;
}

video {
  object-fit: cover;
}
</style>
