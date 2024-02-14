<template>

  
  <Swiper
    :modules="[SwiperAutoplay, SwiperScrollbar]"
    :slides-per-view="1.5"
    :breakpoints="{
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
    }"
    :grab-cursor="true"
    :scrollbar="true"
    :loop="false"
    :space-between="10"
  >
  

  <!--images horizontal scroll-->

    <SwiperSlide v-for="(slide,index) in model" :key="index">
      <div class="rounded-md  lg:h-56 h-36 bg-cover bg-no-repeat" :style="`background: url('http://localhost:8080/images/${prepath}/${slide.path}') center/cover no-repeat  `"> 
      <!-- delete button-->
      <button v-if="deletable" @click="removeElement(slide)" class="btn btn-sm btn-secondary text-primary m-2" prefetch>
        <Icon name="material-symbols:delete-outline" size="20"   />
      </button>

      </div>

    </SwiperSlide>

  </Swiper>

</template>

<script lang="ts" setup>
const deletable= useAttrs().deletable
const prepath= useAttrs().prepath
const model = defineModel()

const recipeStore = useRecipeStore();

/* remove from elements*/
function removeElement(element) {
    if (prepath == "recipes")
    {recipeStore.deleteImage(element.id)}
    else if (prepath == "steps")
    {recipeStore.deleteStepImage(element.id)}
}

</script>

<style>

</style>