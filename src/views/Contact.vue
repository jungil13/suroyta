<template>
  <div class="contact bg-slate-600 min-h-screen flex flex-col">
    <div class="flex flex-col flex-grow">
      <!-- Hero Section -->
      <div class="relative h-[300px] md:h-[400px]">
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: 'url(/placeholder.svg?height=400&width=1200)' }"
        >
          <div class="absolute inset-0 bg-black/50"></div>
        </div>
        <div class="relative flex flex-col p-6 md:p-10 items-center justify-center h-full text-white">
          <h2 class="text-4xl font-extrabold text-center text-slate-100 mb-6">CONTACT US <i class="fa-solid fa-envelope"></i></h2>
          <p class="text-lg italic text-center">Send me your questions, comments, or suggestions!</p>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="flex-1 py-10 px-4 ">
        <div class="max-w-4xl mx-auto space-y-12 shadow-md shadow-black">
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-8 space-y-6">
              <div class="space-y-2">
                <label for="name" class="block text-sm font-medium text-gray-700">Your name</label>
                <input
                  id="name"
                  v-model="form.name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your name"
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Your email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your email"
                />
              </div>
              <div class="space-y-2">
                <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter subject"
                />
              </div>
              <div class="space-y-2">
                <label for="message" class="block text-sm font-medium text-gray-700">Your message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[150px]"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                @click="submitForm"
                class="w-full bg-slate-800 text-white py-3 rounded-md hover:bg-yellow-500 hover:text-black transition duration-300"
              >
                SUBMIT <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="bg-gray-900 text-white py-6 px-4 text-center relative z-10">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-center space-x-4 mb-4">
          <a href="#" class="hover:text-yellow-400 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h12zM8 11h8m-8 4h8m-8-8h8" />
            </svg>
          </a>
          <a href="#" class="hover:text-yellow-400 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 00-3.95 19.29c.31.06.42-.13.42-.3v-1.12c-1.72.37-2.08-.83-2.08-.83-.28-.72-.68-.91-.68-.91-.55-.38.04-.37.04-.37.61.04.93.63.93.63.54.93 1.42.66 1.77.5.06-.39.21-.66.38-.81-1.37-.16-2.81-.68-2.81-3.03 0-.67.24-1.22.63-1.65-.06-.16-.27-.8.06-1.67 0 0 .51-.16 1.67.63a5.8 5.8 0 013.04 0c1.16-.79 1.67-.63 1.67-.63.33.87.12 1.51.06 1.67.39.43.63.98.63 1.65 0 2.36-1.44 2.87-2.81 3.03.21.18.4.54.4 1.09v1.62c0 .17.11.36.42.3A10 10 0 0012 2z" />
            </svg>
          </a>
          <a href="#" class="hover:text-yellow-400 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zM12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z" />
            </svg>
          </a>
        </div>
        <p class="text-sm text-gray-400 mb-2">Follow us on social media for the latest updates</p>
        <p class="text-sm">&copy; 2024 All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      newsletter: '',
    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form);
      alert('Thank you for reaching out!');
      this.resetForm();
    },
    resetForm() {
      this.form = { name: '', email: '', subject: '', message: '' };
    },
  },
};
</script>

<style scoped>
.contact {
  margin: 0;
  min-height: 100vh;
  background-image: url('../assets/img/bitch.jpg');
  background-size: cover;
  background-position: center;
}
</style>