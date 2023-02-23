<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card shadow-lg">
      <div class="card-body">
        <div class="d-flex justify-content-center mb-3">
          <img src="https://cdn.pixabay.com/photo/2015/04/23/17/41/user-736885_960_720.png" class="brand_logo" alt="Logo">
        </div>
        <form>
          <div class="form-group mb-3">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
              <input type="email" v-model="email" class="form-control" placeholder="Email">
            </div>
          </div>
          <div class="form-group mb-4">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-key"></i>
                </span>
              </div>
              <input type="password" v-model="contraseña" class="form-control" placeholder="Contraseña">
            </div>
          </div>
          <div class="form-group text-center">
            <button type="button" class="btn btn-primary btn-block" @click="IniciarSesión">Iniciar sesión</button>
          </div>
          <p v-if="mensajeError" class="text-danger text-center">{{ mensajeError }}</p>
          <div class="form-group text-center">
            <button type="button" class="btn btn-outline-primary" @click="InicioConGoogle">Iniciar con Google</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 
<script setup>
import {ref} from 'vue'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../API/firebase.js'
import {useRouter} from 'vue-router'
const email = ref("")
const contraseña = ref("")
const mensajeError = ref("")
const router = useRouter()
const IniciarSesión = ()=>{
    signInWithEmailAndPassword(auth,email.value,contraseña.value)
        .then((data)=>{
            console.log(data)
            router.push('/DashBoard')
        })
        .catch((error)=>{
            switch(error.code){
                case "auth/invalid-email":
                    mensajeError.value = "Email no válido";
                    break;
                case "auth/user-not-found":
                    mensajeError.value = "Cuenta no encontrada";
                    break;
                case "auth/wrong-password":
                    mensajeError.value = "Contraseña incorrecta";
                    break;
                default:
                    mensajeError.value = "Email o Contraseña incorrectos";
                    break;
            }
        })
}
  const InicioConGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await auth.signInWithPopup(provider)
    router.push('/DashBoard')
  } catch (error) {
    console.error(error)
  }
}

</script>
<style scoped>
.container {
    padding: 3rem 0;
}
</style>