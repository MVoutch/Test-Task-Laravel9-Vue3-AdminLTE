<template>
    <div class="content-wrapper px-4 py-2">
        <HeaderTableComponent title="Employee"/>
        <div class="border w-50 mb-4">
            <h4 class="m-3">Employee edit</h4>
            <form action="" @submit.prevent="submit">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <ul class="p-0 mx-3">
                    <li class="my-4">
                        <p class="font-weight-bold mb-1">Photo</p>
                        <div v-if="photo" class="mb-1">
                            <img :src="photo" class="w-25" alt="">
                        </div>
                        <ImageUpload @file-uploaded="photo = $event"/>
                        <p class="form-text text-warning" v-if="errors.photo" v-text="errors.photo[0]"></p>
                        <p class="form-text text-muted">File format jpg, png up to 5 MB, the minimum size of 300x300px</p>
                    </li>
                    <li class="mt-2">
                        <label>Name</label>
                        <input type="text" class="w-100 px-4 py-2 form-control" v-model="name">
                        <p class="form-text text-warning" v-if="errors.name" v-text="errors.name[0]"></p>
                        <p class="mb-0 text-muted text-right">{{name.length}} / 256</p>
                    </li>
                    <li class="">
                        <label>Phone</label>
                        <input type="text" class="w-100 px-4 py-2 form-control" v-model="phone_number">
                        <p class="form-text text-warning" v-if="errors.phone_number" v-text="errors.phone_number[0]"></p>
                        <p class="mb-0 text-muted text-right">Required format +380 (xx) XXX XX XX</p>
                    </li>
                    <li class="mb-5">
                        <label>Email</label>
                        <input type="email" class="w-100 px-4 py-2 form-control" v-model="email">
                        <p class="form-text text-warning" v-if="errors.email" v-text="errors.email[0]"></p>
                    </li>
                    <li class="mb-5">
                        <label>Position</label>
                        <v-autocomplete
                            v-model="position"
                            :items="positions_list"
                            variant="solo"
                            class="form-control p-0 h-auto overflow-hidden"
                            flat
                            item-title="title"
                            item-value="id"
                            hide-details
                            density="compact"
                        >
                            <template v-slot:item="{ props, item }">
                                <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
                                <v-list-item
                                    v-else
                                    v-bind="props"
                                    :title="item.raw.title"
                                ></v-list-item>
                            </template>
                        </v-autocomplete>
                        <p class="form-text text-warning" v-if="errors.position_id" v-text="errors.position_id[0]"></p>
                    </li>
                    <li class="mb-5">
                        <label>Salary, $</label>
                        <input type="text" class="w-100 px-4 py-2 form-control" v-model="salary">
                    </li>
                    <li class="mb-5">
                        <label>Date of employment</label>
                        <Datepicker v-model="date_of_employment" :format="format" :enable-time-picker="false"></Datepicker>
                        <div v-if="errors.date_of_employment">
                            <p v-for="error in errors.date_of_employment" v-bind:key="error">{{error}}</p>
                        </div>
                    </li>
                    <li class="mb-5">
                        <label>Head</label>
                        <v-autocomplete
                            v-model="head"
                            :items="head_list"
                            variant="solo"
                            class="form-control p-0 h-auto overflow-hidden"
                            flat
                            item-title="name"
                            item-value="id"
                            hide-details
                            density="compact"
                        >
                            <template v-slot:item="{ props, item }">
                                <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
                                <v-list-item
                                    v-else
                                    v-bind="props"
                                    :title="item.raw.name"
                                ></v-list-item>
                            </template>
                        </v-autocomplete>
                        <p class="form-text text-warning" v-if="errors.employee_id" v-text="errors.employee_id[0]"></p>
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
import axios from "axios";
import HeaderTableComponent from "../../components/HeaderTableComponent.vue";
import ImageUpload from "../../components/ImageUpload.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


export default {
    name: "EmployeeEdit",
    components: {
        HeaderTableComponent,
        ImageUpload,
        Datepicker
    },

    setup() {
        const photo = ref('');
        const name = ref('');
        const phone_number = ref('');
        const email = ref('');
        const position = ref();
        const salary = ref(0);
        const head = ref();
        const admin_created_id = ref(0);
        const pos_id = ref(0);
        const admin_updated_id = ref(0);
        const head_id = ref(0);
        const created_at = ref('');
        const updated_at = ref('');
        const date_of_employment = ref();
        const head_list = ref([]);
        const errors = ref([]);
        const positions_list = ref([]);
        const {params} = useRoute()
        const router = useRouter()


        const submit = async () => {
            let put_data = {
                photo: photo.value,
                name: name.value,
                phone_number: phone_number.value,
                email: email.value,
                position_id: !isNaN(parseFloat(position.value)) ? position.value : pos_id.value,
                salary: salary.value,
                date_of_employment: getDate(date_of_employment.value, true),
            }
            if(head.value !== '') {
                let add_head = {employee_id: (head.value !== '' ? !isNaN(parseFloat(head.value)) ? head.value : head_id.value : '')}
                put_data = Object.assign(put_data, add_head);
            }

            await axios.put(`employees/${params.id}`, put_data).then(() => {
                router.push('/employees');
            }).catch(function (error) {
                errors.value = error.response.data.errors
            })
        }

        const load = async () => {
            const response = await axios.get(`employees/${params.id}`);
            const get_head = await axios.get(`employee_list`);
            const get_positions = await axios.get(`position_list`);
            const employee = response.data.data
            head_list.value = get_head.data
            positions_list.value = get_positions.data
            photo.value = employee.photo
            name.value = employee.name
            email.value = employee.email
            phone_number.value = employee.phone_number
            salary.value = employee.salary
            position.value = employee.position.title
            pos_id.value = employee.position.id
            date_of_employment.value = getDate(employee.date_of_employment)
            head.value = employee.head.name
            head_id.value = employee.head.id
            admin_created_id.value = employee.admin_created_id
            admin_updated_id.value = employee.admin_updated_id
            created_at.value = employee.created_at
            updated_at.value = employee.updated_at
        }

        onMounted(load)

        const format = (date_of_employment) => {
            const day = date_of_employment.getDate();
            const month = date_of_employment.getMonth() + 1;
            const year = date_of_employment.getFullYear();

            date_of_employment.value = `${day}.${month}.${year}`;
            return `${day}.${month}.${year}`;
        }

        const getDate = (date, toString = false) => {
            if (toString) {
                let date_format = new Date(date);
                return date_format.getDate()+'.'+date_format.getMonth()+'.'+date_format.getFullYear();
            } else {
                let get_date = date.toString().split('.');
                return new Date((parseInt(get_date[2])),(parseInt(get_date[1])),(parseInt(get_date[0])));
            }
        }

        return {
            submit,
            photo,
            name,
            email,
            phone_number,
            salary,
            date_of_employment,
            format,
            errors,
            position,
            head,
            admin_created_id,
            admin_updated_id,
            created_at,
            updated_at,
            head_list,
            positions_list,
        }
    }
}
</script>

<style scoped>

</style>
