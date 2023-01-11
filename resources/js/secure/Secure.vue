<template>
    <HeaderComponent />
    <SidebarComponent />
    <router-view v-if="admin?.id"  />
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import $ from 'jquery';
import SidebarComponent from "../components/SidebarComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Secure",
    components: {
        HeaderComponent,
        SidebarComponent
    },
    setup() {
        const router = useRouter();
        const admin = ref(null)

        onMounted(async () => {
            try {
                const response = await axios.get('admin')
                admin.value = response.data
            } catch (e) {
                await router.push('/login');
            }
        })

        return {
            admin
        }
    }
}

</script>
