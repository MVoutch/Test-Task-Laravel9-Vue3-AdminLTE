<template>
    <div class="content-wrapper px-4 py-2">
        <HeaderTableComponent title="Position"/>
        <div class="border w-50 mb-4">
            <h4 class="m-3">Add Position</h4>
            <form action="" @submit.prevent="submit">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <ul class="mx-3">
                    <li class="my-3">
                        <label>Title</label>
                        <input type="text" class="w-100 px-4 py-2 form-control" v-model="title">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-6">
                                    <p class="form-text text-warning" v-if="errors.title" v-text="errors.title[0]"></p>
                                </div>
                                <div class="col-sm-6">
                                    <p class="mb-0 text-muted text-right">{{title.length}} / 256</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="d-flex justify-content-end my-2">
                        <button class="btn py-1 px-5 btn-sm mr-4 btn-outline-secondary rounded-0">Cancel</button>
                        <button type="submit" class="btn text-white py-1 px-5 btn-sm btn-secondary buttons-html5 rounded-0">Save</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
import HeaderTableComponent from "../../components/HeaderTableComponent.vue";
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
    name: "PositionCreate",
    components: {
        HeaderTableComponent,
    },

    setup() {
        const title = ref('');
        const errors = ref([]);
        const router = useRouter()

        const submit = async () => {
            await axios.post(`positions/`, {
                title: title.value
            }).then(() => {
                router.push('/positions');
            }).catch(function (error) {
                errors.value = error.response.data.errors
            })
        }

        return {
            title,
            submit,
            errors,
        }
    }
}
</script>

<style scoped>

</style>
