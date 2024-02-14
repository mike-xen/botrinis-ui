<script>
export default {
    data() {
        return {
            year: new Date().getFullYear(),
        };
    },
};
</script>

<template>
    <div class="mx-auto max-w-7xl px-2 min-h-screen">
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <!--logo -->
                <NuxtLink to="/" class="btn btn-ghost"> <img src="/logo.png" class="max-w-36" /></NuxtLink>
            </div>
            <div class="flex-none gap-2" >

                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <!-- <li>
                            <NuxtLink to="/user" class="justify-between">
                                My recipes
                            </NuxtLink>
                        </li> -->
                        <li>
                            <NuxtLink to="/logout">Logout</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
        <slot/>

        <footer class="footer items-center p-4 bg-primary text-primary-content rounded-t-lg ">
            <aside class="items-center grid-flow-col">
                <img src="/favicon.ico" class="w-12" />
                <p>Copyright ©{{ year }} - All right reserved</p>
            </aside>
        </footer>
    </div>

</template>