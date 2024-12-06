<template>
    <div class="max-w-4xl mb-6 mx-auto mt-6 p-6 bg-white rounded-lg border shadow-md shadow-black animate-fade-in">
      <h2 class="text-2xl font-semibold text-teal-600 mb-4">Destination Ratings</h2>

    <!-- Average Rating -->
    <div class="flex items-center mb-6">
      <span class="text-lg text-teal-600">Average Rating: </span>
      <div class="ml-2 flex items-center">
        <span class="text-xl font-bold text-yellow-400">{{ averageRating.toFixed(1) }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 15l-5.878 3.09 1.123-6.56-4.779-4.651 6.638-.61L10 0l2.896 6.269 6.638.61-4.779 4.651 1.123 6.56L10 15z" />
        </svg>
      </div>
    </div>

    <!-- Rating Stars (Allow User to Rate) -->
    <div class="flex items-center mb-4">
      <span class="text-lg text-teal-600 mr-2">Rate this destination: </span>
      <div class="flex">
        <button
          v-for="star in 5"
          :key="star"
          class="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300"
          :class="{
            'bg-yellow-400': rating >= star,
            'bg-gray-300': rating < star
          }"
          @click="submitRating(star)"
          :aria-label="'Rate ' + star + ' stars'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 15l-5.878 3.09 1.123-6.56-4.779-4.651 6.638-.61L10 0l2.896 6.269 6.638.61-4.779 4.651 1.123 6.56L10 15z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Confirmation Message -->
    <div v-if="ratingSubmitted" class="text-teal-600 font-semibold mt-4 animate__animated animate__fadeIn">
      Thank you for your rating!
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rating: 0, // User's rating
      averageRating: 0, // Default average rating
      ratingSubmitted: false, // Confirmation message toggle
    };
  },
  mounted() {
    this.fetchAverageRating();

    // Retrieve saved rating from localStorage
    const savedRating = localStorage.getItem(`rating_${this.postId}`);
    if (savedRating) {
      this.rating = parseInt(savedRating, 10);
      console.log(`Loaded saved rating: ${this.rating}`);
    }
  },
  methods: {
    async fetchAverageRating() {
      try {
        console.log(`Fetching average rating for post ID: ${this.postId}`);
        const response = await axios.get(`http://localhost:3000/api/ratings/post/${this.postId}`);
        this.averageRating = parseFloat(response.data.average_rating) || 0;
        console.log(`Fetched average rating: ${this.averageRating}`);
      } catch (error) {
        console.error('Error fetching average rating:', error.message);
      }
    },
    async submitRating(star) {
      this.rating = star;
      localStorage.setItem(`rating_${this.postId}`, star);
      console.log(`Saved rating: ${this.rating}`);

      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Login required',
          text: 'You must be logged in to submit a rating.',
        });
        return;
      }

      try {
        console.log(`Submitting rating ${this.rating} for post ID: ${this.postId}`);
        const response = await axios.post(
          'http://localhost:3000/api/ratings/',
          {
            post_id: this.postId,
            rating_value: this.rating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          this.averageRating = response.data.averageRating;
          this.ratingSubmitted = true;
          console.log('Rating submitted successfully:', response.data);

          Swal.fire({
            icon: 'success',
            title: 'Thank you!',
            text: 'Your rating has been submitted successfully.',
          });

          setTimeout(() => {
            this.ratingSubmitted = false;
          }, 2000);
        }
      } catch (error) {
        console.error('Error submitting rating:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error submitting your rating. Please try again later.',
        });
      }
    },
  },
};
</script>
