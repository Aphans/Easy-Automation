import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const storeRoom = defineStore("room", () => {
  const rooms = ref([]);
  const addRoom = (room) => {
    // Buscar si la sala ya existe en el array local (rooms)
    const index = rooms.value.findIndex((r) => r.Name === room.Name);
    //Si no existe en el array la añado a la lista
    if (index === -1) {
      rooms.value.push(room);
    }
  };

  const addDevice = (RoomsDevices,device) => {
    //Buscar si el device ya existe en el array que tiene rooms llamado Devices[]
    const index = RoomsDevices.findIndex((d) => d.id === device.id);
    if (index === -1) {
      // El dispositivo no existe, agregarlo al array
      RoomsDevices.push(device);
    } else {
      // El dispositivo ya existe, actualizar su información
      RoomsDevices[index] = device;
    }
  };

  
  return { rooms, addRoom, addDevice };
}
);
