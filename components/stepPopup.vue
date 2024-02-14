<template>
  <div>
    <dialog class="modal " id="step_modal">
      <div class="modal-box w-11/12 max-w-5xl overflow-hidden">
        <div class="h-[75vh] w-full overflow-y-scroll">
        <h2 class="text-2xl   ">Title</h2>

        <input type="text" placeholder="Title" class="input input-primary w-full max-w-xs text-lg "
          v-model="curentStep.title" />
        <h2 class="text-2xl   mt-5">Description</h2>
        <textarea class="textarea w-full textarea-bordered" v-model="curentStep.description"
          placeholder="Proccedure"></textarea>

        <h2 class="text-2xl   mt-5">Duration</h2>

        <div class="flex flex-row space-x-3 ">

          <label class="form-control w-30 max-w-xs">
            <input type="number" placeholder="s" class="input input-bordered" v-model="curentStep.seconds"
              min="0" max="3000" />
            <div class="label">
              <span class="label-text ">Seconds</span>
            </div>
          </label>



        </div>

        <div class="flex flex-row  my-5">
          <h2 class="text-2xl ">Incredients</h2>
          <button class="btn btn-sm btn-ghost text-primary" prefetch @click="recipeStore.addTempIncredient">
            <Icon name="ph:plus-bold" size="20" />
          </button>

        </div>
        
        <div v-auto-animate>
        <div class="flex flex-col" v-for="i in curentStep.ingredients" >

          <div class="join space-x-2 space-y-2">
            <input type="number" placeholder="1" class="input input-bordered  w-20 " v-model="i.amount" />

            <select class="select  w-22 select-bordered" v-model="i.measurementUnit">
              <option selected value="cup">cup</option>
              <option value="tables" >Ts</option>
              <option value="teas" >ts</option>
              <option value="l">L</option>
              <option value="g">G</option>
              <option value="mg">mg</option>
              <option value="kg">kg</option>
            </select>

            <input type="text" placeholder="eggs" class="input input-bordered w-full max-w-xs text-lg " v-model="i.name" />
            <button class="btn  btn-ghost text-primary" prefetch @click="recipeStore.deleteIncredient(i.id)">
              <Icon name="ph:minus-bold" size="25" />
            </button>

          </div>
        </div>
      </div>

        <div class="flex flex-row  my-5 space-x-2">
          <h2 class="text-2xl">Images</h2>
          <button class="btn btn-sm btn-ghost text-primary" prefetch @click="uploadStepImage()">
            <Icon name="ph:plus-bold" size="20" />
          </button>

          <input type="file" id="stepimagesinp" hidden multiple @change="getStepImages" />

        </div>
        <PhotoCarousel :deletable="true" v-model="curentStep.stepImages" prepath="steps"
          key="stepscarousel" />

        </div>


        <div class="join m-auto space-x-2"> 
          <button class="btn btn-ghost hover:bg-secondary hover:text-secondary-content" @click="deleteStep">delete</button>
        <button class="btn btn-primary  " @click="close">Save</button>


      </div>



      </div>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
const isopen = defineModel()
const recipeStore = useRecipeStore();
const curentStep = computed(() => recipeStore.curentStep);
const { addStepImage } = useRecipeStore()

function uploadStepImage() {
  const fileinp = document.getElementById("stepimagesinp") as HTMLInputElement;
  fileinp.click();
}

function deleteStep() {
  recipeStore.deleteStep();
  close();
}



function getStepImages() {
  const fileinp = document.getElementById("stepimagesinp") as HTMLInputElement;
  const files = fileinp.files;
  if (files) {

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      addStepImage(file)
    }
  }
}

watch(isopen, (newval) => {
  if (newval) {
    (document.getElementById("step_modal") as any).showModal()
  }
})

function close() {
  isopen.value = false;
  recipeStore.saveStepsToServer();
  (document.getElementById("step_modal") as any).close();
}




</script>

<style></style>