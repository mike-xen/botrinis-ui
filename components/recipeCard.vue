<template>
  
  <a :href="`/r/${recipe.id}`" class="card  bg-base-100 shadow-md image-full col-span-1  row-span-1 min-h-60 max-w-full "
    :class="{ 'lg:col-span-2 lg:row-span-2': big, 'lg:col-span-1 ': !big }" >
    <figure><img :src="recipeImage?`http://localhost:8080/images/recipes/${recipeImage}`: '/ph.jpg' " alt="" />
    </figure>

    <div class="card-body p-6 ">
      <div class="grid content-end h-full gap-2">
        <NuxtLink :to="`/r/${recipe.id}/edit`" v-if="canedit" class="btn btn-sm btn-ghost  w-10 p-0 text-primary" >
          <Icon name="ph:pencil-bold" size="24" />
        </NuxtLink>

        

        <h3 class="card-title text-3xl font-thin text-base-100 font-serif">{{ recipe.title }}</h3>


        <div class="flex flex-row">

          <div class="badge badge-md badge-accent  mr-2 gap-2">
            <Icon name="uil:food" /> {{ recipe.category.name }}
          </div>
          <div class="badge badge-md badge-accent   mr-2 gap-2">
            <Icon name="icon-park-outline:muscle" /> {{ recipe.difficulty }}
          </div>
          <div class="badge badge-md badge-accent   gap-2">
            <Icon name="icon-park-outline:time" /> {{ Math.floor(recipe.steps.reduce((partialSum, a) => partialSum + a.seconds, 0)/60) }} min
          </div>
             <!-- play button -->

        </div>

  



      </div>

    </div>
  </a>
</template>

<script lang="ts" setup>
const recipe = useAttrs().recipe
const big = useAttrs().big
const canedit = useAttrs().canedit

const recipeImage = (recipe as { recipeImages: { path: string }[] })?.recipeImages[0]?.path;



</script>

<style></style>