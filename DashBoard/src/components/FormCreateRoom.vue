<template>
     <form @submit.prevent="createRoom" class="mb-6">
      <div class="flex items-center mb-2">
        <label for="name-room" class="w-1/4 text-gray-600">Name:</label>
        <input id="name-room" type="text" v-model="nameRoom" class="w-3/4 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
      </div>
      <div class="flex items-center mb-2">
        <label for="description-room" class="w-1/4 text-gray-600">Description:</label>
        <input id="description-room" type="text" v-model="descriptionRoom" class="w-3/4 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Create</button>
    </form>
</template>
<script setup>
import { ref } from 'vue';
import {dameDocs,anadir} from '../API/firebase/'
import { storeRoom } from '../stores/room';

const nameRoom = ref("");
const descriptionRoom = ref("");
const store = storeRoom()

const createRoom = async () => {
  const newRoom = {
    Name: nameRoom.value,
    Description: descriptionRoom.value,
  };
  const rooms = await dameDocs("Rooms"); // Obtener todas las salas existentes
  const roomNames = store.rooms.map((room) => room.Name); // Obtener los nombres de las salas existentes
  if (roomNames.includes(newRoom.Name)) {
    // Verificar si el nombre de la nueva sala ya existe
    alert("El nombre de la sala ya existe. Por favor, elija otro nombre."); // Mostrar mensaje de error
  } else {
    await anadir("Rooms", newRoom); // Crear la nueva sala en la base de datos
    nameRoom.value="",
    descriptionRoom.value=""
  }
};

</script>