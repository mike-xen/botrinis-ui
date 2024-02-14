export default defineNuxtRouteMiddleware((to, from) => {

    const userStore = useUserStore()

    const user=computed(() => userStore.user)   


    if (!user.value.username ) {
        if (to.path === '/login') {
            return
         }else if (to.path === '/register') {
            return
        }

        return navigateTo('/login')
    } else {
        if (to.path === '/login') {
            return navigateTo('/')
        }
    }
    
   

})
