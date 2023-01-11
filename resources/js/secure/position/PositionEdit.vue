<template>
    <div class="content-wrapper px-4 py-2 vh-100">
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
                    <li class="mb-5">
                        <div class="row">
                            <div class="col-sm-6 d-flex" v-if="created_at && admin_created_id">
                                <p class="mr-1 font-weight-bold">Created at:</p>
                                <p>{{created_at}}</p>
                            </div>
                            <div class="col-sm-6 d-flex">
                                <p class="mr-1 font-weight-bold">Admin Created ID:</p>
                                <p>{{admin_created_id}}</p>
                            </div>
                        </div>
                        <div class="row" v-if="updated_at && admin_updated_id">
                            <div class="col-sm-6 d-flex">
                                <p class="mr-1 font-weight-bold">Updated at:</p>
                                <p>{{updated_at}}</p>
                            </div>
                            <div class="col-sm-6 d-flex">
                                <p class="mr-1 font-weight-bold">Admin Updated ID:</p>
                                <p>{{admin_updated_id}}</p>
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
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";

export default {
    name: "PositionEdit",
    components: {
        HeaderTableComponent,
    },

    setup() {
        const title = ref('');
        const errors = ref([]);
        const admin_created_id = ref(0);
        const admin_updated_id = ref(0);
        const created_at = ref('');
        const updated_at = ref('');
        const {params} = useRoute()
        const router = useRouter()

        const submit = async () => {
            await axios.put(`positions/${params.id}`, {
                title: title.value
            }).then(() => {
                router.push('/positions');
            }).catch(function (error) {
                errors.value = error.response.data.errors
            })
        }

        onMounted(async () => {
            const response = await axios.get(`positions/${params.id}`);
            const position = response.data.data
            title.value = response.data.data.title
            admin_created_id.value = position.admin_created_id
            admin_updated_id.value = position.admin_updated_id
            created_at.value = position.created_at
            updated_at.value = position.updated_at
        })

        return {
            title,
            errors,
            submit,
            admin_created_id,
            admin_updated_id,
            created_at,
            updated_at,
        }
    }
}
</script>

<style scoped>

</style>
