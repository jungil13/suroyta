<template>
  <div class="chatbot-container">
    <!-- Floating Button -->
    <div @click="toggleChat" class="chat-button">
      <img src="https://media0.giphy.com/avatars/ibani-official/sQvRP2ADNHbN.gif" alt="" class="rounded-full">
    </div>

    <!-- Chat Interface -->
    <div v-if="isChatOpen" class="chat-window">
      <div class="chat-header">
        <h2>Chat with <span class="text-yellow-100 font-bold">BOTIG</span></h2>
        <button @click="toggleChat" class="close-button">×</button>
      </div>
      <div class="chat-body">
        <ul>
          <li v-for="(msg, index) in messages" :key="index">
            <strong>{{ msg.sender }}:</strong> {{ msg.text }}
          </li>
        </ul>
      </div>
      <div class="chat-footer">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          class="chat-input"
        />
        <button @click="sendMessage" class="send-button">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isChatOpen = ref(false);
const userInput = ref('');
const messages = ref([
  { sender: 'Botig', text: 'Hello! How can I assist you today?' },
]);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const sendMessage = () => {
  if (userInput.value.trim()) {
    messages.value.push({ sender: 'You', text: userInput.value });
    userInput.value = '';
    
    // Simulate bot response with a longer conversation
    setTimeout(() => {
      messages.value.push({
        sender: 'Botig',
        text: 'hello Boang kag kaliwat?',
      });
    }, 1000);

    setTimeout(() => {
      messages.value.push({
        sender: 'Botig',
        text: 'Unsa kinahanglan nimo nga tabang?',
      });
    }, 2000);

    setTimeout(() => {
      messages.value.push({
        sender: 'Botig',
        text: 'Makig-istorya ko sa imong mga pangutana.',
      });
    }, 3000);

    setTimeout(() => {
      messages.value.push({
        sender: 'Botig',
        text: 'Unsa pa man ang imong gipangayo?',
      });
    }, 4000);
  }
};
</script>


<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-button {
  background-color: #05c6f7;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;
}

.chat-button:hover {
  transform: scale(1.1);
}

.chat-window {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background: #4caf50;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-body {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  max-height: 300px;
}

.chat-footer {
  padding: 10px;
  display: flex;
  gap: 10px;
}

.chat-input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.send-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #45a049;
}
</style>
