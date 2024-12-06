<template>
    <div class="dashboard">
      <Sidebar />
      <div class="main-content">
        <Header />
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from './Sidebar.vue';
  import Header from './Header.vue';
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    height: 100vh;
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .content {
    padding: 20px;
    background-color: #f4f4f4;
    flex: 1;
  }
  </style>