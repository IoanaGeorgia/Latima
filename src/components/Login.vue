<script setup lang="ts">
import { ref } from 'vue'
import Loader from './Loader.vue'
import { useUserStore } from '@/stores/poems.ts'
import router from '@/router/index.ts';

defineProps<{}>()

const userStore = useUserStore()

const isSubmitted = ref(false)
const isLoading = ref(false)

const userData = ref({
  mail: "",
  password: "",
})

const userErrors = ref({
  mail: "",
  password: "",
  callError: ""
})

function validateData() {

  // mail validation

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.value.mail) {
    userErrors.value.mail = "E-mail address is required"
  }
  else if (!emailRegex.test(userData.value.mail)) {
    userErrors.value.mail = "Please enter a valid e-mail address";
  }
  else {
    userErrors.value.mail = ""
  }


  // password validation

  if (!userData.value.password) {
    userErrors.value.password = "Password is required";
  }
  else if (userData.value.password.length < 8) {
    userErrors.value.password = "Password must be at least 8 characters long";
  }
  else if (!/[a-zA-Z]/.test(userData.value.password) || !/[0-9]/.test(userData.value.password)) {
    userErrors.value.password = "Password must contain at least one letter and one number";
  }
  else {
    userErrors.value.password = "";
  }


  const hasErrors = Object.entries(userErrors.value).some(
    ([key, error]) => key !== "callError" && error !== ""
  );

  if (hasErrors) {
    return;
  }


  submitData()

}

async function submitData() {
  userErrors.value.callError = "";
  isLoading.value = true;

  try {
    const response = await fetch("/api/loginUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData.value),
      credentials: "include" 

    })


    const result = await response.json();
    if (!response.ok) {
      userErrors.value.callError = result.message || "An error has occurred, please try again later!"
      return
    }

    userStore.setUser(result.data);

    isSubmitted.value = true;


  } catch (err) {
    userErrors.value.callError = "An error has occured, please try again later"
  } finally {
    isLoading.value = false
  }
}

function goHome(){
  window.location.href = "/";
}


</script>

<template>
  <div class="page-wrapper register-wrapper">
    <div class="title-wrapper">
      <p class="title">Login</p>
    </div>

    <div v-if="isSubmitted">
      <Loader v-if="isLoading" />
      <div v-else class="submitted">
        <p><strong>Login successful</strong></p>
        <p>To access your account, please refresh this page!</p>
        <button @click="goHome">Refresh</button>
        <div>𓆏</div>
      </div>
    </div>
    <div v-else class="form-wrapper">

      <form class="container">

        <div class="input-wrapper">
          <label for="mail">Email</label>
          <input id="mail" v-model="userData.mail" placeholder="Your mail address here">
          <p class="error-msg" v-if="userErrors.mail">{{ userErrors.mail }}</p>
        </div>


        <div class="input-wrapper">
          <label for="password">Password</label>
          <input id="password" v-model="userData.password" placeholder="Choose a password">
          <p class="error-msg" v-if="userErrors.password">{{ userErrors.password }}</p>
        </div>

        <p class="error-msg" v-if="userErrors.callError">{{ userErrors.callError }}</p>
        <button type="submit" @click.prevent="validateData">Login</button>

      </form>

      <div class="login">
        <p>Don't have an account yet?</p>
        <RouterLink to="/register">
          <button>Register
          </button>
        </RouterLink>
      </div>

    </div>
  </div>
</template>



<style scoped>
.login {
  max-width: 500px;
  width: 100%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
}
</style>