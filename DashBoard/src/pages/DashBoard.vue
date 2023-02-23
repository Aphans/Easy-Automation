<template>
  <div class="p-12">
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-3xl font-semibold mb-4 text-gray-800">Stats</h2>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="bg-blue-400 rounded-lg p-6 flex flex-col items-center justify-center text-white"
        >
          <h3 class="text-2xl font-semibold">{{ store.rooms.length }}</h3>
          <p class="text-lg">Rooms</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mt-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a2 2 0 00-2 2v8a2 2 0 002 2h7v-2H5V5h10v2h2V5a2 2 0 00-2-2H3z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="bg-purple-400 rounded-lg p-6 flex flex-col items-center justify-center text-white"
        >
          <h3 class="text-2xl font-semibold">{{ countDevices }}</h3>
          <p class="text-lg">Devices</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mt-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.732 9.732a2 2 0 00-2.828 2.828l3.536 3.536a2 2 0 002.828 0l3.536-3.536a2 2 0 10-2.828-2.828L10 11.172l-1.464-1.464a2 2 0 00-2.804 0z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M13.268 10.268a2 2 0 002.828-2.828l-3.536-3.536a2 2 0 00-2.828 0L6.172 10.268a2 2 0 002.828 2.828L10 11.172l1.464 1.464a2 2 0 002.804 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
    <FormCreateRoom />
    <div class="grid grid-cols-2 gap-6">
      <CardRoom
        v-for="room in store.rooms"
        :key="room.id"
        :id="room.id"
        :Name="room.Name"
        :Description="room.Description"
        :devices="room.Devices"
        @roomDeleted="deleteRooms"
        @deviceDeleted="deleteDevices"
      >
      </CardRoom>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from "vue";
import { storeRoom } from "../stores/room";
import CardRoom from "../components/CardRoom.vue";
import FormCreateRoom from "../components/FormCreateRoom.vue";
import { giveCollection, borraDoc, anadir, dameDocs } from "@/API/firebase";

//Se crea la constante rooms para almacenar las salas

const rooms = ref([]);

//Se inicializa el store
const store = storeRoom();

//Se cargan las salas y los dispositivos
onMounted(() => {
  loadRoomsAndDevices();
});

const loadRoomsAndDevices = async () => {
  await giveCollection("Rooms", (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const room = {
        id: doc.id,
        Name: doc.data().Name,
        Description: doc.data().Description,
        Devices: [],
      };

      store.addRoom(room);
    });
  });
  await giveCollection("Devices", (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const device = {
        id: doc.id,
        Name: doc.data().Name,
        Value: doc.data().Value,
        Type: doc.data().Type,
        Room: doc.data().Room,
      };
      store.rooms.forEach((room) => {
        //Se comprueba si la sala tiene el mismo nombre que el nombre de la sala
        //que tiene el dispositivo y se envia la lista donde tiene el mismo
        //nombre de sala que el dispositivo y el dispositivo a añadir
        if (room.Name === device.Room) {
          store.addDevice(room.Devices, device);
        }
      });
    });
  });
};
// Eliminar salas y dispositivos en el dashboard
const deleteRooms = async (roomId) => {
  // Borrar la sala de la base de datos
  await borraDoc("Rooms", roomId);

  // Filtrar la lista de salas para quitar la sala que acabas de borrar
  const newRooms = store.rooms.filter((room) => room.id !== roomId);

  // Actualizar el valor de rooms con el nuevo array filtrado
  store.rooms = newRooms;
};

const deleteDevices = async (deviceId) => {
  // Recorrer la lista de habitaciones para encontrar la habitación que contiene el dispositivo
  for (let i = 0; i < store.rooms.length; i++) {
    const room = store.rooms[i];
    const index = room.Devices.findIndex((device) => device.id !== deviceId);
    if (index === -1) {
      // Si se encuentra el dispositivo, borrarlo de la lista de dispositivos de la habitación
      room.Devices.splice(index, 1);
      // Borrar el dispositivo de la base de datos
      await borraDoc("Devices", deviceId);
      // Salir del bucle una vez que se ha encontrado y eliminado el dispositivo
      break;
    }
  }
}

const countDevices = computed(() => {
 return store.rooms.map((el)=>el.Devices)
               .reduce((acc,el)=>acc+=el.length,0);

});

</script>
