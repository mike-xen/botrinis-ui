<template>
  <div v-if="small"
    :class="`relative bg-no-repeat bg-cover w-full ]  before:absolute before:left-0 
  before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-gradient-to-b before:from-transparent before:to-black h-36 `" :style="`background: url('${recipeImage?`http://localhost:8080/images/recipes/${recipeImage}`: '/ph.jpg'}')`">

    <div class="absolute top-0 left-0 right-0  bottom-0 z-20 flex flex-col h-full m-6 justify-between">
      <nuxt-link to="/" class="w-10 p-0">
        <Icon name="material-symbols:arrow-back" size="40" class="text-white " />
      </nuxt-link>

      <div>

        <h1 v-if="!edit" class="text-4xl  text-white mb-4 font-serif font-light">{{ model.title }}</h1>
        <input v-else type="text" placeholder="Title" class="input input-ghost w-full max-w-xs text-2xl text-base-100 font-serif font-light "  v-model="model.title"/>

        
      </div>
    </div>

  </div>
<div v-else
    :class="`relative bg-no-repeat bg-cover w-full  before:absolute before:left-0 
  before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-gradient-to-b before:from-transparent before:to-black h-96 `" :style="`background: url('${recipeImage?`http://localhost:8080/images/recipes/${recipeImage}`: '/ph.jpg'}')`">

    <div class="absolute top-0 left-0 right-0  bottom-0 z-20 flex flex-col h-full m-6 justify-between">
      <NuxtLink to="/">
        <Icon name="material-symbols:arrow-back" size="40" class="text-white" />
      </NuxtLink>

      <div>
        <h1 class="text-4xl  text-white mb-4 font-serif font-light">{{ model.title }}</h1>
        <div class="flex flex-col lg:flex-row space-y-3 lg:space-y-0">
          <div>
          <div class="badge badge-lg badge-accent  mr-2 gap-2">
            <Icon name="uil:food" /> {{ model.category?.name }}
          </div>
          
          <div class="badge badge-lg badge-accent  mr-2 gap-2">
            <Icon name="icon-park-outline:muscle" /> {{ model.difficulty }}
          </div>
          <div class="badge badge-lg badge-accent   gap-2">
            <Icon name="icon-park-outline:time" /> {{ Math.floor(model.steps?.reduce((partialSum, a) => partialSum + a.seconds, 0)/60)  }} sec
          </div>
        </div>

          <nuxt-link :to="`/r/${model.id}/cook/`" class="btn btn-sm bg-primary lg:ml-auto lg:text-xl " prefetch>
            <Icon name="ph:play-bold" class="text-secondary" /> cook
          </nuxt-link>
        </div>
       
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

const model = defineModel()

const small= useAttrs().small
const edit= useAttrs().edit

const recipeImage = (model as { recipeImages: { path: string }[] })?.recipeImages?.first?.path;
</script>

<style>

</style>