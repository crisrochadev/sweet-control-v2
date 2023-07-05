
<template>
  <sweet-card class="w-full md:w-4/12">
    <div id="logo" class="flex justify-center items-center w-full">
      <img
        src="/img/icons/msapplication-icon-144x144.png"
        class="w-14 md:w-20"
      />
      <h1 class="flex flex-col items-start justify-end uppercase font-bold">
        <span class="text-2xl mt-3 block text-pink-500 -mb-1">Sweet</span
        ><span class="pl-[2px] text-teal-400 p-0 -mt-1">Control</span>
      </h1>
    </div>
    <div class="w-full my-4 flex justify-center items-center">
      <sweet-button @handleClick="googleLogin">
        <img src="/img/icons/google-icon.svg" />
        <p>Entrar com google</p>
      </sweet-button>
    </div>
    <div
      class="w-full h-2 border-b border-teal-400 before:content-['ou'] before:-translate-y-2/4 before:left-2/4 before:-translate-x-2/4 before:w-6 before:text-center before:uppercase before:text-xs before:font-bold before:bg-white before:absolute before:top-[6px] before:text-teal-400 relative"
    ></div>
    <sweet-form
      v-model:form="formLogin"
      icon="login"
      @handleSubmit="auth.login"
      btnLabel="Entrar"
      btnClass="bg-teal-300 hover:bg-teal-400 focus:bg-teal-500"
      inputClass="border-teal-300 border-1"
    />
    <p class="flex justify-around gap-4 text-xs items-center">
      Não tem cadatro ?
      <sweet-button
        label="cadastrar"
        link
        color="text-pink-800"
        @handleClick="$router.push({ name: 'register' })"
      />
    </p>
  </sweet-card>
  <div></div>
</template>


<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>
