<template>
  <div class="hero min-h-screen bg-base-200" style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold text-base-100">Let’s cook</h1>
      <p class="py-6"></p>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body">
        <div class="form-control" >
          <label class="label">
            <span class="label-text" >username</span>
          </label>
          <input v-model="username"  placeholder="username" class="input input-bordered" required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text" >Password</span>
          </label>
          <input type="password" v-model="password" placeholder="password" class="input input-bordered" required />
  
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary"  @click.prevent="login()">Login</button>
        </div>

          <NuxtLink :to="{ name: 'register' }" class="btn btn-ghost">or Register</NuxtLink>
 
      </form>
      
    </div>
    
  </div>
</div>
</template>

<script lang="ts" setup>

const username = ref('');
const password = ref('');

definePageMeta({
  layout: 'empty'
})

const userStore = useUserStore();

function login() {
  userStore.login(username.value, password.value).then((res) => {
  useRouter().push('/');
  }).catch((err) => {
    alert('Login failed');
  });
}

</script>

<style>

</style>