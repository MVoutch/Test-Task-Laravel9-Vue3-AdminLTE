<template>
    <RemoveModalComponent @remove-id="removeTrigger($event)" title="Position"/>
    <div class="content-wrapper px-4 py-2 vh-100">
        <HeaderTableComponent title="Position" add-link="/position/create"/>
        <div class="container-fluid">
            <TableRender class="dt-head-right" :data="render_data" :columns="columns" :tds="td"></TableRender>
        </div>
    </div>
</template>

<script>
import TableRender from "../../components/TableRender";
import {onMounted, ref} from "vue";
import axios from "axios";
import $ from "jquery";
import HeaderTableComponent from "../../components/HeaderTableComponent";
import RemoveModalComponent from "../../components/RemoveModalComponent";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Positions",
    components: {HeaderTableComponent, RemoveModalComponent, TableRender},
    setup() {
        const td = [
            'Title',
            'Last update',
            'Action',
        ]
        const columns = [
            {data: 'title' },
            {data: 'updated_at',
                className: 'min-width'
            },
            {data: 'id',
                "render": function (data, type, row) {
                    let html_start = '<div class=\'d-flex mt-2\'>';
                    let remove_button = "<a href='position/"+data+"/edit' class='btn btn-tool btn-xl'><i class='fa fa-pencil-alt'></i></a>";
                    let edit_button = "<button type='button' data-toggle='modal' data-target='#exampleModal' data-id='"+row.id+"' data-message='"+row.title+"'  id='removeAlert' class='btn btn-tool btn-md'><i class='fa fa-trash-alt'></i></button>";
                    let html_end = '</div>';
                    if(row.title === 'Unknown' && row.id === 1) {
                        return html_start + edit_button + html_end
                    } else {
                        return html_start + remove_button + edit_button + html_end
                    }
                },
                className: 'table-action',},
        ]
        const render_data = ref([])

        const load = async () => {
            const response = await axios.get(`positions`);

            render_data.value = response.data.data
        }

        const removeTrigger = async (id) => {
            await axios.delete(`positions/${id}`)
            load();
        }

        onMounted(load)

        return {
            columns,
            removeTrigger,
            render_data,
            td,
        }
    }
}


$(document).on("click", "#removeAlert", function () {
    $('.modal-title').text('Remove Position');
    $('.modal-body').html('<p>Are you sure you want to remove position '+$(this).data('message')+' ?</p>')
    $('#removeData').attr('href', 'position/'+$(this).data('id')+'/remove')
});
</script>

<style type="text/scss">

</style>
