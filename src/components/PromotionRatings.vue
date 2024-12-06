<template>
    <div class="max-w-4xl mb-6 mx-auto mt-6 p-6 bg-white rounded-lg border shadow-md shadow-black animate-fade-in">
      <h2 class="text-2xl font-semibold text-teal-600 mb-4">Promotion Ratings</h2>
  
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
        <span class="text-lg text-teal-600 mr-2">Rate this promotion: </span>
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
  import Swal from 'sweetalert2';
  
  export default {
    props: {
      promotionId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        rating: 0, // The rating value selected by the user
        averageRating: 0, // Default value, will be fetched from the server
        ratingSubmitted: false, // To track if the rating was submitted
      };
    },
    mounted() {
      // Fetch the average rating for this promotion
      this.fetchAverageRating();
  
      // Load the previously saved rating from localStorage (if any)
      const savedRating = localStorage.getItem(`rating_${this.promotionId}`);
      if (savedRating) {
        this.rating = parseInt(savedRating, 10);
      }
    },
    methods: {
      async fetchAverageRating() {
        try {
          const response = await axios.get(`http://localhost:3000/api/ratings/promotion/${this.promotionId}`);
          // Parse the average_rating to a number (float)
          this.averageRating = parseFloat(response.data.average_rating) || 0; // Default to 0 if not found
        } catch (error) {
          console.error('Error fetching average rating:', error);
        }
      },
  
      async submitRating(star) {
        this.rating = star;
  
        // Save the rating to localStorage
        localStorage.setItem(`rating_${this.promotionId}`, star);
  
        // Prepare the data to send to the backend
        const token = localStorage.getItem('token'); // Get the token from localStorage
  
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Login required',
            text: 'You must be logged in to submit a rating.',
          });
          return;
        }
  
        try {
          // Sending the rating to the backend API
          const response = await axios.post(
            'http://localhost:3000/api/ratings/', 
            {
              promotion_id: this.promotionId,
              rating_value: this.rating,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the Bearer token
              },
            }
          );
  
          // Handle the response and update the average rating
          if (response.data.success) {
            // Update the average rating with the response data from the backend
            this.averageRating = response.data.averageRating;
            this.ratingSubmitted = true;
  
            // Display success alert
            Swal.fire({
              icon: 'success',
              title: 'Thank you!',
              text: 'Your rating has been submitted successfully.',
            });
  
            // Reset the "thank you" message after 2 seconds
            setTimeout(() => {
              this.ratingSubmitted = false;
            }, 2000);
          }
        } catch (error) {
          console.error('Error submitting rating:', error);
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
  
  <style scoped>
  /* Custom animation for the confirmation message */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* Optional: Add any extra custom styles you may want */
  </style>
  