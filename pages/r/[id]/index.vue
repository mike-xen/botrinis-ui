<template>
  <!--image with transparent to black gradient in front and a title-->
    <RecipeBanner v-model="curentRecipe" />

    <div class="p-10">
      <h2 class="text-2xl  mb-5 text-base-100 ">Steps preview</h2>

      <div class="lg:w-96">
        <div class="collapse collapse-arrow bg-accent mb-2 " v-for="(slide, i) in curentRecipe.steps">

          <input type="radio" name="my-accordion-2" :checked="i == 0" />
          <div class="collapse-title text-xl font-medium text-accent-content">
            {{ slide.title }}
          </div>
          <div class="collapse-content text-accent-content">
            {{ Math.floor(slide.seconds / 60) }} min
            <p> {{ slide.description }}</p>
          </div>
        </div>


      </div>




      <h2 class="text-2xl my-5 text-base-100 min-w-full mt-20">Images</h2>



      <PhotoCarousel v-model="curentRecipe.recipeImages" prepath="recipes" />
    </div>
</template>

<script setup lang="ts">
const id = useRoute().params.id as string;

onMounted(() => {
  recipeStore.setCurentRecipe(id);
});

const recipeStore = useRecipeStore();

const curentRecipe = computed(() => recipeStore.curentRecipe);






definePageMeta({
  layout: 'recipe'
})
</script>

