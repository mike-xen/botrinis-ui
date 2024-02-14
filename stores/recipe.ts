import { set } from 'nuxt/dist/app/compat/capi';
import { defineStore } from 'pinia'

interface image {
  alt: string;
  id: string;
  path: string;
}

interface ingredient {
  id: string;
  name: string;
  amount: number;
  measurementUnit: string;
}

interface step {
  id: string,
  stepImages: Array<image>,
  title: string,
  description: string,
  ingredients: Array<ingredient>,
  seconds: number,
  order: string
}

interface recipe {
  category: { name: string };
  difficulty: string;
  id: string;
  recipeImages: Array<image>;
  steps: Array<step>;
  title: string;

}

export const useRecipeStore = defineStore({
  id: 'recipeStore',
  state: () => ({ recipes: [] as Array<recipe>, curentRecipe: {} as recipe |null as recipe , curentStep: {}  as step |null as step,loading:true}),
  persist: true,
  actions: {

   async setCurentRecipe(id: string) {
      const { user } = useUserStore()
      this.loading=true;

      const res = await fetch(`http://localhost:8080/recipes/${id}`, {
        method: "GET",
        headers: {
          'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
        }
      })

      if (res.status !== 200) {
        this.loading=false;
        throw new Error('fetch failed');
      } else {
        /*add response to the end of table */
        this.curentRecipe = await res.json() as recipe
        this.loading=false;
      }
      
    },

    async setcurentStep(id: string) {
      if (this.curentRecipe.steps) {
        this.curentStep = this.curentRecipe.steps.find((element) => element.id == id) as step 
      }
    },


    async fetchRecipes() {
      const { user } = useUserStore()
      this.loading=true;

      const res = await fetch("http://localhost:8080/recipes", {
        method: "GET",
        headers: {
          'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
        }
      })

      if (res.status !== 200) {
        this.loading=false;
        throw new Error('fetch failed');
      } else {
        /*add response to the end of table */
        this.recipes = await res.json() as Array<recipe>
        this.loading=false;
      }

    },

    async createRecipe(title: string) {
      const { user } = useUserStore()


      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("category", "other");

      var headers = new Headers();

      //headers.append('Content-Type', 'text/json');
      headers.set('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

      const res = await fetch("http://localhost:8080/recipe", {
        method: "POST",
        body: formdata,
        headers: headers

      });

      if (res.status !== 200) {
        throw new Error('creation failed')
      } else {
        /*add response to the end of table */
        const newRecipe = await res.json() as recipe

        // whare null add the right type
        if (newRecipe.steps === null) {
          newRecipe.steps = [];
        }
        if (newRecipe.recipeImages === null) {
          newRecipe.recipeImages = [];
        }


        this.recipes.push(newRecipe)
        this.curentRecipe = newRecipe
        useRouter().push('/r/' + newRecipe.id + '/edit')
      }



    },

    async addImage(image: File) {
      const { user } = useUserStore()


      var formdata = new FormData();
      formdata.append("alt", image.name);
      formdata.append("img", image);

      var headers = new Headers();

      //headers.append('Content-Type', 'text/json');
      headers.set('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

      const res = await fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/image", {
        method: "POST",
        body: formdata,
        headers: headers

      });

      if (res.status !== 200) {
        throw new Error('creation failed')
      } else {
        /*add response to the end of table */
        const newImage = await res.json()
        this.curentRecipe.recipeImages = newImage.recipeImages
      }



    },

    async addStep() {
      const user = useUserStore().user

      var formdata = new FormData();
      formdata.append("title", `step ${Number(this.curentRecipe.steps.length) + 1}`);
      formdata.append("description", "-");
      formdata.append("seconds", "0");

      var headers = new Headers();

      //headers.append('Content-Type', 'text/json');
      headers.set('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

      const res = await fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/steps", {
        method: "POST",
        body: formdata,
        headers: headers

      });

      if (res.status !== 200) {
        throw new Error('creation failed');
      } else {
        /*add response to the end of table */
        const response = await res.json();
        this.curentRecipe.steps.push(response);
        this.curentStep = response;
      }

    },

    async editStep() {
      const user  = useUserStore().user

      if (this.curentStep.id) {
        var formdata = new FormData();
        formdata.append("title", this.curentStep.title);
        formdata.append("description", this.curentStep.description);
        formdata.append("seconds", this.curentStep.seconds.toString());

        var headers = new Headers();

        //headers.append('Content-Type', 'text/json');
        headers.set('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

        const res = await fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/steps/" + this.curentStep.id, {
          method: "PUT",
          body: formdata,
          headers: headers
        });

        if (res.status !== 200) {
          console.log(res)
          throw new Error('creation failed')
        } else {
          /*add response to the end of table */
          const response = await res.json()
          if (this.curentRecipe.steps) {
            this.curentRecipe.steps[this.curentRecipe.steps.findIndex((element) => element.id == this.curentStep.id)] = response;
          }
        }

      } else {
        throw new Error('step not found')
      }


    },

    async deleteStep() {
      const { user } = useUserStore()

      fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/steps/" + this.curentStep.id, {
        method: "DELETE",
        headers: {
          'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
        }
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error('deletion failed')
        } else {
          /*add response to the end of table */
          if (this.curentRecipe.steps) {
            this.curentRecipe.steps = this.curentRecipe.steps.filter((element) => element.id !== this.curentStep.id);
          }
        }
      })

    },

    async addStepImage(image: File) {
      const { user } = useUserStore()
      var formdata = new FormData();
      formdata.append("alt", image.name);
      formdata.append("img", image);

      var headers = new Headers();

      //headers.append('Content-Type', 'text/json');
      headers.set('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

      const res = await fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/steps/" + this.curentStep.id + "/image", {
        method: "POST",
        body: formdata,
        headers: headers

      });

      if (res.status !== 200) {
        throw new Error('creation failed')
      } else {
        /*add response to the end of table */
        const newImage = await res.json()

        if (this.curentRecipe.steps) {
          this.curentRecipe.steps[this.curentRecipe.steps.findIndex((element) => element.id == this.curentStep.id)].stepImages = newImage.stepImages;
        }
      }



    },

    async addTempIncredient() {
      if (!this.curentStep.ingredients) {
        this.curentStep.ingredients = []
      }
      //find uuid
      const uuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          // eslint-disable-next-line no-mixed-operators
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
      }
      this.curentStep.ingredients.push({ id: `temp_${uuid}`, name: "", amount: Number(), measurementUnit: "cup" })
    },

    async addIncredient(amount: number, name: string, measurementUnit: string,tempid:string) {
      const { user } = useUserStore()


      var formdata = new FormData();
      formdata.append("amount", amount.toString());
      formdata.append("measurementUnit", measurementUnit);
      formdata.append("name", name);

      var headers = new Headers();

      //headers.append('Content-Type', 'text/json');
      headers.set('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

      const res = await fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/steps/" + this.curentStep.id + "/ingredient", {
        method: "POST",
        body: formdata,
        headers: headers
      });

      if (res.status !== 200) {
        throw new Error('creation failed')
      } else {
        /*add response to the end of table */
        const response = await res.json() as ingredient

        if (this.curentStep.ingredients) {
          this.curentStep.ingredients[this.curentStep.ingredients.findIndex((element) => element.id == tempid)] = response;
        }

      }
    },


    async saveStepsToServer() {
      this.editStep();

      //saves incredients with id temp to server
      if (this.curentStep.ingredients) {
        for (let index = 0; index < this.curentStep.ingredients.length; index++) {
          if (this.curentStep.ingredients[index].id.toString().split("_")[0]==="temp" ) {
            await this.addIncredient(this.curentStep.ingredients[index].amount, this.curentStep.ingredients[index].name, this.curentStep.ingredients[index].measurementUnit,this.curentStep.ingredients[index].id);
          } else {
            this.editIncredient(this.curentStep.id, this.curentStep.ingredients[index].id);
          }
        }
      }
    },


    async editRecipe() {
      const { user } = useUserStore()

      if (this.curentRecipe.id) {
        var formdata = new FormData();
        formdata.append("title", this.curentRecipe.title);
        formdata.append("category", this.curentRecipe.category.name);
        formdata.append("difficulty", this.curentRecipe.difficulty);

        var headers = new Headers();

        //headers.append('Content-Type', 'text/json');
        headers.set('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

        const res = await fetch("http://localhost:8080/recipes/" + this.curentRecipe.id, {
          method: "PUT",
          body: formdata,
          headers: headers
        });

        if (res.status !== 200) {
          console.log(res)
          throw new Error('update failed')
        } else {
          /*add response to the end of table */
          const response = await res.json()
          if (this.curentRecipe.steps) {
            this.curentRecipe = response;
          }
        }

      } else {
        throw new Error('recipe not found')
      }
    
    },

    async deleteRecipe() {
      const { user } = useUserStore()

      fetch("http://localhost:8080/recipes/" + this.curentRecipe.id, {
        method: "DELETE",
        headers: {
          'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
        }
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error('deletion failed')
        } else {
          /*add response to the end of table */
          this.recipes = this.recipes.filter((element) => element.id !== this.curentRecipe.id);
          useRouter().push('/')
        }
      })

    },

    async deleteImage(imageid: string) {
      const { user } = useUserStore()

      fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/image/" + imageid, {
        method: "DELETE",
        headers: {
          'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
        }
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error('creation failed')
        } else {
          /*add response to the end of table */
          this.curentRecipe.recipeImages = this.curentRecipe.recipeImages.filter((element) => element.id !== imageid);
        }
      })

    },

    async deleteStepImage(imageid: string) {
      const { user } = useUserStore()

      fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/steps/" + this.curentStep.id + "/image/" + imageid, {
        method: "DELETE",
        headers: {
          'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
        }
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error('creation failed')
        } else {
          /*add response to the end of table */
          if (this.curentStep.stepImages) {
            this.curentStep.stepImages = this.curentStep.stepImages.filter((element) => element.id !== imageid);
          }
        }
      })

    },






    async editIncredient(stepid: string, incredientid: string) {
      const { user } = useUserStore()
      const tempincredient = this.curentRecipe.steps?.find((element) => element.id == stepid)?.ingredients?.find((element) => element.id == incredientid)


      if (tempincredient) {
        var formdata = new FormData();
        formdata.append("amount", tempincredient.amount.toString());
        formdata.append("measurementUnit", tempincredient.measurementUnit);
        formdata.append("name", tempincredient.name);

        var headers = new Headers();

        //headers.append('Content-Type', 'text/json');
        headers.set('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

        const res = await fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/steps/" + stepid + "/ingredient/" + incredientid, {
          method: "PUT",
          body: formdata,
          headers: headers
        });

        if (res.status !== 200) {
          throw new Error('creation failed')
        } else {
          /*add response to the end of table */
          const response = await res.json()
          if (this.curentRecipe.steps) {
            const stepIndex = this.curentRecipe.steps.findIndex((element) => element.id == stepid);
            const ingredientIndex = this.curentRecipe.steps[stepIndex].ingredients?.findIndex((element) => element.id == incredientid);
            if (stepIndex !== -1 && ingredientIndex !== -1) {
              this.curentRecipe.steps[stepIndex].ingredients[ingredientIndex] = response;
            }
          }
        }

      } else {
        throw new Error('step not found')
      }


    },

    async deleteIncredient(incredientid: string) {
      const { user } = useUserStore()

      if(incredientid.toString().split("_")[0]==="temp"){
        this.curentStep.ingredients?.splice(this.curentStep.ingredients?.findIndex((element) => element.id == incredientid), 1);
        return;
      }else{

      fetch("http://localhost:8080/recipe/" + this.curentRecipe.id + "/steps/" + this.curentStep.id + "/ingredient/" + incredientid, {
        method: "DELETE",
        headers: {
          'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
        }
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error('creation failed')
        } else {
          /*add response to the end of table */
          if (this.curentRecipe.steps) {
            const stepIndex = this.curentRecipe.steps.findIndex((element) => element.id ==  this.curentStep.id );
            const ingredientIndex = this.curentRecipe.steps[stepIndex].ingredients?.findIndex((element) => element.id == incredientid);
            if (stepIndex !== -1 && ingredientIndex !== -1) {
              this.curentRecipe.steps.filter((element) => element.id ==  this.curentStep.id )[stepIndex].ingredients?.splice(ingredientIndex, 1);
            }
          }
        }
        
      })

    }

    },








  }
})
