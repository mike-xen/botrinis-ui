<template>
  <!--image with transparent to black gradient in front and a title-->

  <RecipeBanner :small="true" :edit="true" class="fixed" v-model="curentRecipe" @change="recipeStore.editRecipe()"/>
  <div class="p-6 mt-3 lg:p-14">
    <div class="flex lg:flex-row flex-col  lg:space-x-10 space-y-3 lg:space-y-0">
      <div class="flex flex-col space-y-3 ">
        <h2 class="text-2xl text-base-100 ">Category</h2>
        <!--category input-->

        <!-- select category picker -->
        <select class="select select-ghost w-52 text-base-100"  v-model="curentRecipe.category.name" @change="recipeStore.editRecipe()">
          <option value="other">other</option>
          <option value="pizza">pizza</option>
          <option value="pasta">pasta</option>
          <option value="salad">salad</option>
          <option value="meat">meat</option>
          <option value="fish">fish</option>
          <option value="vegan">vegan</option>
          <option value="vegetarian">vegetarian</option>
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
          <option value="appetizer">appetizer</option>
          <option value="sauce">sauce</option>
          <option value="soup">soup</option>
          <option value="dessert">dessert</option>
          <option value="drink">drink</option>
        </select>


      </div>

      <!--recipe dificulty radio easy medium hard-->
      <div class="flex flex-col space-y-3 ">
        <h2 class="text-2xl text-base-100 ">Dificulty</h2>

        <div class="flex flex-row space-x-3 ">

          <div class="form-control">
            <label class="label cursor-pointer space-x-2">
              <input type="radio" name="dif" class="radio bg-base-100 checked:bg-primary"
                @click="curentRecipe.difficulty = 'easy'" :checked="curentRecipe.difficulty == 'easy'" @change="recipeStore.editRecipe()"/>
              <span class="label-text text-base-100">easy</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer space-x-2">
              <input type="radio" name="dif" class="radio bg-base-100 checked:bg-primary"
                @click="curentRecipe.difficulty = 'medium'" :checked="curentRecipe.difficulty == 'medium'" @change="recipeStore.editRecipe()"/>
              <span class="label-text text-base-100">medium</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer space-x-2">
              <input type="radio" name="dif" class="radio bg-base-100 checked:bg-primary"
                @click="curentRecipe.difficulty = 'hard'" :checked="curentRecipe.difficulty == 'hard'" @change="recipeStore.editRecipe()"/>
              <span class="label-text text-base-100">hard</span>
            </label>
          </div>

        </div>

      </div>

    </div>


    <!-- add button next to title-->






    <div class="flex flex-row  my-5 space-x-2">
      <h2 class="text-2xl   text-base-100">Images</h2>
      <button class="btn btn-sm btn-ghost text-primary" prefetch @click="uploadImage()">
        <Icon name="ph:plus-bold" size="20" />
      </button>

      <input type="file" id="recipeimagesinp" hidden multiple @change="getimages" />

    </div>
    <PhotoCarousel :deletable="true" v-model="curentRecipe.recipeImages" prepath="recipes" key="recipeimagescatousel" />


    <div class="flex flex-row  my-5">
      <h2 class="text-2xl  text-base-100 ">Steps</h2>
      <button class="btn btn-sm btn-ghost text-primary" @click="createStep" prefetch>
        <Icon name="ph:plus-bold" size="20" />
      </button>

    </div>

    <div class="flex flex-col space-y-3" v-auto-animate>
      <div class="join" v-for="(i,value) in curentRecipe.steps" >

        <!-- step title-->
        <div class="bg-base-200 rounded-md p-2 w-80 " >
          <p class="text-secondary ">{{ i.title }}</p>
        </div>

        <button class="btn btn-ghost text-primary" @click="editStep(i)">
          <Icon name="ph:pencil" size="25" />
        </button>

      </div>
    </div>



  </div>

<StepPopup v-model="isStepPopupOpen"/>

</template>

<script setup lang="ts">
const id = useRoute().params.id as string;
const recipeStore = useRecipeStore()
const { addImage, addStep } = recipeStore;
const curentRecipe= computed(()=>recipeStore.curentRecipe) ;

onBeforeMount(() => {
  recipeStore.setCurentRecipe(id);
});


const isStepPopupOpen = ref(false);


function getimages() {
  const fileinp = document.getElementById("recipeimagesinp") as HTMLInputElement;
  const files = fileinp.files;
  if (files) {

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      addImage(file)


    }
  }
}

function editStep(step: any) {
  recipeStore.curentStep = step ;
  isStepPopupOpen.value = true;
}


function uploadImage() {
  const fileinp = document.getElementById("recipeimagesinp") as HTMLInputElement;
  fileinp.click();
}

function createStep() {
  addStep();
  isStepPopupOpen.value = true;
}



definePageMeta({
  layout: 'recipe'
})
</script>