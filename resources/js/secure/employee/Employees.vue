<template>
    <RemoveModalComponent @remove-id="removeTrigger($event)" title="Employee"/>
    <div class="content-wrapper px-4 py-2 vh-100">
        <HeaderTableComponent title="Employee" add-link="/employee/create"/>
        <div class="container-fluid">
            <TableRender :data="render_data" :columns="columns" :tds="td"></TableRender>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import {onMounted, ref} from "vue";
import TableRender from "../../components/TableRender.vue";
import $ from 'jquery';
import HeaderTableComponent from "../../components/HeaderTableComponent.vue";
import RemoveModalComponent from "../../components/RemoveModalComponent.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Employees",
    components: {HeaderTableComponent, RemoveModalComponent, TableRender},
    props: {

    },
    setup() {
        const td = [
            'Photo',
            'Name',
            'Position',
            'Date of employment',
            'Phone number',
            'Email',
            'Salary',
            'Action',
        ]
        const columns = [
            {data: 'photo',
                "render": function ( data) {return "<img class='img-circle img-size-32 mx-auto width-full' src='"+data+"' >";},
                className: 'table-photo dt-body-center',},
            {data: 'name', className: 'get_item_name' },
            {data: 'position', 'render': function (data) {return data.title} },
            {data: 'date_of_employment' },
            {data: 'phone_number' },
            {data: 'email' },
            {data: 'salary' },
            {data: 'id',
                "render": function (data, type, row) {
                    return "<div class='d-flex mt-2'>" +
                        "<a href='employee/"+data+"/edit' class='btn btn-tool btn-xl'><i class='fa fa-pencil-alt'></i></a>" +
                        "<button type='button' data-toggle='modal' data-target='#exampleModal' data-id='"+row.id+"' data-message='"+row.name+"'  id='removeAlert' class='btn btn-tool btn-md'><i class='fa fa-trash-alt'></i></button>" +
                        "</div>";},
                className: 'table-action',
            },

        ]
        const render_data = ref([])

        const load = async () => {
            const response = await axios.get(`employees`);

            render_data.value = response.data.data
        }

        const removeTrigger = async (id) => {
            await axios.delete(`employees/${id}`)
            load();
        }

        onMounted(load);


        return {
            columns,
            render_data,
            removeTrigger,
            td,
        }
    }
}

$(document).on("click", "#removeAlert", function () {
    $('.modal-title').text('Remove Employee');
    $('.modal-body').html('<p>Are you sure you want to remove employee '+$(this).data('message')+' ?</p>')
    $('#removeTrigger').attr('data-id', $(this).data('id'))
});
</script>
