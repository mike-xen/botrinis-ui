<template>
  <div >
    <RecipeBanner :small="true" v-model="curentRecipe" />
    <progress class="progress progress-accent mt-10" :value="progress" :max="sumSteps"></progress>

    <div class="mx-5 mt-10 lg:mx-40 lg:mt-2" v-auto-animate>
      <!--step number explanation and incredients used -->
      <div class="flex flex-col justify-evenly h-72" >

        <div class="flex flex-row space-x-2 items-end text-primary" v-auto-animate>
          <h2 class="text-2xl max-w-fit">{{ curentStep.title }}</h2>
          <p class="text-secondary w-44"  v-if="curentStep.seconds">{{ Math.round(curentStep.seconds/60) }} mins {{ Math.round(curentStep.seconds) - Math.round(curentStep.seconds/60) }} seconds</p>
        </div>
        <p class="text-accent text-sm" v-if="curentStep.ingredients">Incredients: {{ curentStep.ingredients.map(function (inc) {
          return inc.name;
        }).join(",") }}</p>
        <p class="text-base-100">{{ curentStep.description }}</p>

        <!-- prev next btns-->
        <div class="flex flex-row space-x-2">
          <button class="btn btn-primary" v-if="progress>0" @click="prevStep">
            <Icon name="grommet-icons:previous"></Icon>
          </button>
          <button class="btn btn-primary" @click="nextStep" v-if="progress<sumSteps">
            <Icon name="grommet-icons:next" ></Icon> Next
          </button>
          <button class="btn btn-primary" v-if="progress==sumSteps">
            <Icon name="mingcute:fullscreen-exit-2-fill"></Icon> exit
          </button>
        </div>





      </div>

      <PhotoCarousel class="mt-9 h-1/4" v-model="curentStep.stepImages" prepath="steps"/>
    </div>








  </div>
</template>

<script lang="ts" setup>


const recipeStore = useRecipeStore();
const curentRecipe = computed(() => recipeStore.curentRecipe);

const curentStep = ref(curentRecipe.value.steps[0]);

const progress = ref(0);



function updateProgress() {
  const index = curentRecipe.value.steps.indexOf(curentStep.value);
  return curentRecipe.value.steps.slice(0, index).reduce((a, b) => a + b.seconds, 0);
}

const sumSteps = computed(() => {
  return curentRecipe.value.steps.reduce((a, b) => a + b.seconds, 0);
});

function nextStep() {
  const index = curentRecipe.value.steps.indexOf(curentStep.value);
  if (index < curentRecipe.value.steps.length - 1) {
    curentStep.value = curentRecipe.value.steps[index + 1];
    progress.value = updateProgress();
  }
  else if (index == curentRecipe.value.steps.length - 1){
    curentStep.value = {id:"",title:"The end",description:"Very good share photos with your friends",seconds:0,ingredients:null,stepImages:[],order:""}
    progress.value = sumSteps.value;
  }

}

function prevStep() {
  const index = curentRecipe.value.steps.indexOf(curentStep.value);
  if (index > 0) {
    curentStep.value = curentRecipe.value.steps[index - 1];
  }else {
    curentStep.value = curentRecipe.value.steps[curentRecipe.value.steps.length - 1];
  }
  progress.value = updateProgress();

}




useSeoMeta({
  title: 'Execute recipe',
})

definePageMeta({
  layout: 'recipe'
})

</script>

<style></style>