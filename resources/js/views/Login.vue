<template>
    <header class="navbar-gray">
        <h1 class="px-4 py-2 h2 font-weight-bold">Test task</h1>
    </header>
    <section class="login-page">
        <form class="login-box" @submit.prevent="submit">
            <input type="hidden" name="_token" value="{{ csrf_token() }}" />
            <h2 class="h3 font-weight-light">Login</h2>
            <div class="my-5">
                <div class="form-group mb-3">
                    <label for="email">Email</label>
                    <input class="form-control" id="email" type="email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input class="form-control" id="password" type="password" v-model="password">
                </div>
            </div>
            <button type="submit" class="btn btn-block btn-secondary">Login</button>
        </form>
    </section>
</template>

<script>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    setup() {
        const email = ref('admin@example.com');
        const password = ref('password');
        const router = useRouter();

        const submit = async () => {
            await axios.post('/login', {
                email: email.value,
                password: password.value,
            })

            await router.push('/')
        }

        return {
            email,
            password,
            submit
        }
    }
}
</script>

<style scoped>

</style>
