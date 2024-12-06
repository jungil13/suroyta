<template>
    <div class="card bg-white rounded-lg shadow-lg shadow-black p-4 transition-transform transform hover:scale-105">
      <div class="flex items-center justify-between">
        <div class="text-3xl text-blue-500">{{ icon }}</div>
        <div class="text-right">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <p class="text-2xl font-bold text-gray-800">{{ count }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['title', 'count', 'icon']);
  </script>
  
  <style scoped>
  .card {
    transition: transform 0.2s;
  }
  </style>