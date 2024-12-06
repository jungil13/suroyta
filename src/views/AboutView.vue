<template>
  <div class="about bg-yellow-800  min-h-screen flex flex-col">
    <div class="absolute inset-0 bg-black opacity-70 "></div>
   <main class="flex-grow">
       <div class="max-w-7xl w-full mx-auto p-4 md:p-8 relative z-10">
           <h2 class="text-3xl font-extrabold mb-8 text-center text-slate-100">ABOUT SUROY-TA!</h2>
           <div class="bg-gray-900 bg-opacity-75 p-6 md:p-8 rounded-lg mb-8 shadow-lg shadow-black">
               <p class="mb-4 italic text-sm md:text-base  text-white">
                   ~ Suroy-ta! is a blog-post website that focuses on recommending tourist spot destinations within Cebu City. Its main goal is to establish informative and good service to people who visit our website.
               </p>
               <p class="text-right text-sm md:text-base text-white">~ Admin</p>
           </div>

           <div class="text-center">
               <h3 class="text-2xl mb-4 text-black">Partnership by:</h3>
               <div class="flex flex-wrap justify-center gap-6 md:gap-10">
                   <!-- Partnership logos -->
                   <div class="flex flex-col items-center">
                       <div class="w-16 h-16 md:w-24 md:h-24 bg-gray-300 shadow-md shadow-black rounded-full flex items-center justify-center mb-2">
                           <span class="text-gray-800 text-lg md:text-xl font-bold">CPH</span>
                       </div>
                       <span class="text-sm md:text-base text-white">Cordova Pet hub</span>
                   </div>
                   <div class="flex flex-col items-center">
                       <div class="w-16 h-16 md:w-24 md:h-24 bg-gray-300 rounded-full shadow-md shadow-black flex items-center justify-center mb-2">
                           <span class="text-gray-800 text-lg md:text-xl font-bold">EP</span>
                       </div>
                       <span class="text-sm md:text-base text-white">Enchanted Paradise</span>
                   </div>
                   <div class="flex flex-col items-center">
                       <div class="w-16 h-16 md:w-24 md:h-24 bg-gray-300 rounded-full shadow-md shadow-black flex items-center justify-center mb-2">
                           <span class="text-gray-800 text-lg md:text-xl font-bold">TT</span>
                       </div>
                       <span class="text-sm md:text-base text-white">Turbo Trace</span>
                   </div>
               </div>
           </div>
       </div>
   </main>
  </div>
  
</template>

<script>
export default {
 name: 'AboutUs',
 data() {
   return {
     selectedPost: 'latest',
     selectedDashboard: 'dashboard',
     selectedDestinationType: '',
     selectedAction: 'create',
     searchQuery: '',
   }
}
}
</script>

<style>
  .about {
   position: relative;
           margin: 0;
           min-height: 100vh;
           background-image: url('../assets/img/4k.jpg');
           background-size: cover;
           background-position: center;
       }

       /* Dark overlay */
       .about::before {
           content: '';
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           background-color: rgba(0, 0, 0, 0.5); /* Black overlay with 50% opacity */
           z-index: -1; /* Ensures the overlay stays behind the content */
       }
</style>