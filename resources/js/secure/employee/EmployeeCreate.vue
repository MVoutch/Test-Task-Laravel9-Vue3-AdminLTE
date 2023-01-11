<template>
    <div class="content-wrapper px-4 py-2">
        <HeaderTableComponent title="Employee"/>
        <div class="border w-50 mb-4">
            <h4 class="m-3">Employee edit</h4>
            <form action="" @submit.prevent="submit">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <ul class="p-0 mx-3">
                    <li class="my-4">
                        <p class="font-weight-bold mb-1"><i v-if="errors.photo" class="fa fa-times-circle mr-1"></i>Photo</p>
                        <div class="mb-1">
                            <img v-if="photo" :src="photo" class="w-25" alt="">
                        </div>
                        <p class="form-text text-warning" v-if="errors.photo" v-text="errors.photo[0]"></p>
                        <ImageUpload @file-uploaded="photo = $event"/>
                        <p class="form-text text-muted">File format jpg, png up to 5 MB, the minimum size of 300x300px</p>
                    </li>
                    <li class="mt-2">
                        <label><i v-if="errors.name" class="fa fa-times-circle mr-1"></i>Name</label>
                        <input type="text" class="w-100 px-4 py-2 form-control" v-model="name">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-6">
                                    <p class="form-text text-warning" v-if="errors.name" v-text="errors.name[0]"></p>
                                </div>
                                <div class="col-sm-6">
                                    <p class="mb-0 text-muted text-right">{{name.length}} / 256</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="">
                        <label><i v-if="errors.phone_number" class="fa fa-times-circle mr-1"></i>Phone</label>
                        <input type="text" class="w-100 px-4 py-2 form-control" v-model="phone_number">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-6">
                                    <p class="form-text text-warning" v-if="errors.phone_number" v-text="errors.phone_number[0]"></p>
                                </div>
                                <div class="col-sm-6">
                                    <p class="mb-0 text-muted text-right">Required format +380 (xx) XXX XX XX</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="mb-5">
                        <label><i v-if="errors.email" class="fa fa-times-circle mr-1"></i>Email</label>
                        <input type="email" class="w-100 px-4 py-2 form-control" v-model="email">
                        <p class="form-text text-warning" v-if="errors.email" v-text="errors.email[0]"></p>
                    </li>
                    <li class="mb-5">
                        <label><i v-if="errors.position_id" class="fa fa-times-circle mr-1"></i>Position</label>
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
                        <label><i v-if="errors.photo" class="fa fa-times-circle mr-1"></i>Salary, $</label>
                        <input type="text" class="w-100 px-4 py-2 form-control" v-model="salary">
                    </li>
                    <li class="mb-5">
                        <label><i v-if="errors.date_of_employment" class="fa fa-times-circle mr-1"></i>Date of employment</label>
                        <Datepicker v-model="date_of_employment" :format="format" :enable-time-picker="false"></Datepicker>
                        <div v-if="errors.date_of_employment">
                            <p v-for="error in errors.date_of_employment" v-bind:key="error">{{error}}</p>
                        </div>
                    </li>
                    <li class="mb-5">
                        <label><i v-if="errors.employee_id" class="fa fa-times-circle mr-1"></i>Head</label>
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
import ImageUpload from "../../components/ImageUpload.vue";
import Datepicker from "@vuepic/vue-datepicker";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

export default {
    name: "EmployeeCreate",
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
        const pos_id = ref(0);
        const head_id = ref(0);
        const date_of_employment = ref();
        const head_list = ref([]);
        const positions_list = ref([]);
        const errors = ref([]);
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
            if (head.value !== '') {
                let add_head = {employee_id: (head.value !== '' ? !isNaN(parseFloat(head.value)) ? head.value : head_id.value : '')}
                put_data = Object.assign(put_data, add_head);
            }

            await axios.post(`employees`, put_data).then(() => {
                router.push('/employees');
            }).catch(function (error) {
                errors.value = error.response.data.errors
            })
        }

        onMounted(async () => {
            const get_head = await axios.get(`employee_list`);
            const get_positions = await axios.get(`position_list`);
            head_list.value = get_head.data
            positions_list.value = get_positions.data
        })

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
            head_list,
            positions_list,
        }
    }
}
</script>

<style scoped>

</style>
