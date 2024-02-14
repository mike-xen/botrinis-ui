<template>
  <div class="min-h-screen">
  <div class="flex flex-row  my-5 space-x-4 ">
    <h2 class="text-2xl  text-primary font-bold">My recipes</h2>
    
    <button class="btn btn-sm btn-secondary" onclick="my_modal_1.showModal()">
      <Icon name="ph:plus-bold" size="20" />
    </button>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-2xl  text-primary font-bold mb-5">Add recipe</h3>
        <input type="text" v-model="newRecipeTitle" placeholder="Title" class="input input-secondary w-full text-xl  font-serif font-light " />
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn" @click="addRecipe">Create</button>
          </form>
        </div>
      </div>
    </dialog>

  </div>

  <!-- user recipes-->
  <div v-auto-animate>
  <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-3 mb-10" v-if="recipes.length > 0" >
    <RecipeCard v-for="(item, key) in recipes" :recipe="item" :canedit="true" :big="key==0" />
  </div>
  <!-- loading for 2 seconds and then show arrow to the + button if theres not recipes with the text add your free recipe-->
  <div class="flex flex-col items-center justify-center" v-else-if="recipes.length == 0 && recipesStore.loading">
    <span class="loading loading-spinner loading-lg "></span>
    <p class="text-2xl text-primary font-bold">Loading</p>
  </div>
  <div class="flex flex-col items-center justify-center" v-else>
    <Icon name="ph:plus-bold" size="40" class="text-primary" />
    <p class="text-2xl text-primary font-bold">Add your first recipe</p>
  </div>
</div>
</div>
</template>

<script lang="ts" setup>
const recipesStore = useRecipeStore();
const {createRecipe} = recipesStore;
const recipes = computed(() => recipesStore.recipes);

onMounted(() => {
  recipesStore.fetchRecipes();
});




const newRecipeTitle = ref('');

function addRecipe() {
  createRecipe(newRecipeTitle.value)

}



</script>



<style></style>