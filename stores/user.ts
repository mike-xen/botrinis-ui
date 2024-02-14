interface user {
  username: string; password: string;
}
export const useUserStore = defineStore({
  id: 'user',

  
  state: () => ({
    user: <user>{},
    
  }),


  persist: true,

  actions: {

    async login(username: string, password: string) {

      var formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);

      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: formdata,
      });

      if (res.status !== 200) {
        throw new Error('Login failed')
      } else {
        this.user = { username: username, password: password }
      }



    },

    async register(username: string, password: string) {

      var formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);

      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: formdata,
      });

      if (res.status !== 200) {
        throw new Error('Registration failed')
      } else {
        this.user = { username: username, password: password }
      }
    },


    async logout() {
      this.user = <user>{}
    }



  }
  

},)
