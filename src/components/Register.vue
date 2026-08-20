<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Loader from './Loader.vue'
import { useUserStore } from '@/stores/poems.ts'

defineProps<{}>()

export interface User {
  name: string
  created: string
  in_submission: number
}

const userStore = useUserStore()

const isSubmitted = ref(false)
const isLoading = ref(false)

const userData = ref({
  username: "",
  mail: "",
  password: "",
  retype_password: ""
})

const userErrors = ref({
  username: "",
  mail: "",
  password: "",
  retype_password: "",
  callError:""
})

function validateData() {

  // username validation
  if (!userData.value.username) {
    userErrors.value.username = "Username is required"
  }
  else if (userData.value.username.length < 4) {
    userErrors.value.username = "Minimum 5 characters"

  }
  else if (userData.value.username.length > 21) {
    userErrors.value.username = "Maximum 20 characters allowed"
  }
  else {
    userErrors.value.username = ""
  }

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

  // type password again verification
  if (!userData.value.retype_password) {
    userErrors.value.retype_password = "Please type your password again"
  } else if (userData.value.retype_password !== userData.value.password) {
    userErrors.value.retype_password = "Password don't match!"
  }
  else {
    userErrors.value.retype_password = ""; 
  }

const hasErrors = Object.entries(userErrors.value).some(
  ([key, error]) => key !== "callError" && error !== ""
);

if (hasErrors) {
  return;
}


submitData()

}

async function submitData(){
    isSubmitted.value = true
    isLoading.value = true;

  try{
    const response = await fetch("/api/createUser", {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData.value)
    })

    if(!response.ok){
      userErrors.value.callError = "An error has occured, please try again later!"
      return
    }
    const result = await response.json()
    userStore.setUser(result) 
    console.log(result)
    if(result.data._id){
    localStorage.setItem("user", result.data._id);
  }

  }catch(err){
    userErrors.value.callError = "An error has occured, please try again later"
  }finally{
    isLoading.value = false
  }
}


</script>

<template>
  <div class="page-wrapper register-wrapper">
    <div class="title-wrapper">
      <p class="title">Sign up</p>
    </div>

    <div v-if="isSubmitted">
      <Loader v-if="isLoading" />
      <div v-else class="submitted">
        <p><strong>Thank you for registering!</strong></p>
        <p>To access your account, please refresh this page!</p>
        <div>𓆏</div>
      </div>
    </div>
    <div v-else class="form-wrapper">
    <p class="note">After signing up, you will be able to share your poems with others and also save poems your favourite poems.
      All you need is a your email and a chosen poem. <br>
      Have fun reading!
    </p>

      <form class="container">
        <div  class="input-wrapper">
          <label for="username">Username</label>
          <input id="username" v-model="userData.username" placeholder="Your username here">
          <p class="error-msg" v-if="userErrors.username">{{ userErrors.username }}</p>
        </div>

        <div  class="input-wrapper">
          <label for="mail">Email</label>
          <input id="mail" v-model="userData.mail" placeholder="Your mail address here">
          <p class="error-msg" v-if="userErrors.mail">{{ userErrors.mail }}</p>
        </div>


        <div  class="input-wrapper">
          <label for="password">Password</label>
          <input id="password" v-model="userData.password" placeholder="Choose a password">
          <p class="error-msg" v-if="userErrors.password">{{ userErrors.password }}</p>
        </div>

        <div  class="input-wrapper">
          <label for="retype_password">Type password again</label>
          <input id="retype_password" v-model="userData.retype_password" placeholder="Type password again">
          <p class="error-msg" v-if="userErrors.retype_password">{{ userErrors.retype_password }}</p>
        </div>

            <p class="error-msg" v-if="userErrors.callError">{{ userErrors.callError }}</p>
        <button type="submit" @click.prevent="validateData">Register</button>
     
      </form>
    </div>
  </div>
</template>
