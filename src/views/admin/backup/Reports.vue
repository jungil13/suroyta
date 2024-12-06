<template>
    <div class="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-bold text-teal-600 mb-6">Reports Management</h1>
  
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-teal-600 text-white">
            <tr>
              <th class="p-4">Report ID</th>
              <th class="p-4">Username</th>
              <th class="p-4">Post Title</th>
              <th class="p-4">Reason</th>
              <th class="p-4">Status</th>
              <th class="p-4">Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="report in reports"
              :key="report.report_id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="p-4">{{ report.report_id }}</td>
              <td class="p-4">{{ report.username }}</td>
              <td class="p-4">{{ report.post_title || "N/A" }}</td>
              <td class="p-4">{{ report.reason }}</td>
              <td class="p-4">{{ report.status }}</td>
              <td class="p-4">{{ new Date(report.created_at).toLocaleString() }}</td>
            </tr>
            <tr v-if="reports.length === 0">
              <td class="p-4 text-center text-gray-500" colspan="6">
                No reports available.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination Controls -->
      <div class="flex justify-between items-center mt-4">
        <button
          class="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const reports = ref([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const pageSize = 10;
  
  // Fetch paginated reports
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reports/getall", {
        params: { page: currentPage.value, limit: pageSize },
      });
      reports.value = response.data;
      // Update totalPages if API returns this info (you can enhance the backend to provide total count)
      // totalPages.value = Math.ceil(response.data.totalCount / pageSize);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };
  
  // Go to the next page
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchReports();
    }
  };
  
  // Go to the previous page
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchReports();
    }
  };
  
  // Fetch initial reports
  onMounted(() => {
    fetchReports();
  });
  </script>
  
  