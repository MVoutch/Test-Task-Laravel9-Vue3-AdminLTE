<template>
    <DataTable :class="render_class+' row-border compact stripe own-style'" :data="data" :columns="columns" >
        <thead>
        <tr>
            <th v-for="td in tds" v-bind:key="td" v-text="td"></th>
        </tr>
        </thead>
    </DataTable>
</template>

<script>
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import 'datatables.net-select';

export default {
    name: "TableRender",
    components: {DataTable},
    props: {
        data: {
            required: true,
            type: Object
        },
        columns: {
            required: true,
            type: Object
        },
        tds: {
            required: true,
            type: Array
        },
        render_class: {
            type: String
        },
    },
    setup() {
        DataTable.use(DataTablesLib);
    }
}
</script>

<style>
@import 'datatables.net-dt';
</style>

<style lang="scss">
table.own-style {

    border: 1px solid #cbcccf !important;
    td {
        vertical-align:top;
    }
}

table.dataTable.compact thead th {
    padding-top: 15px !important;
    padding-left: 0 ;
    padding-bottom: 15px !important;
}

th.table-photo {
    width: 55px !important;
    padding-left: 15px !important;
}

.table-action {
    i {
        font-size: 21px;
    }
}

th.table-action {
    width: 65px;
}

th.min-width {
    width: 10%;
}

div.dataTables_paginate {
    border: 1px solid #cbcccf;
    padding-top: 0 !important;
    margin: 10px 0 !important;

    > span {
        display: inline-block !important;
        border-left: 1px solid #cbcccf !important;
        border-right: 1px solid #cbcccf !important;
    }

    a.paginate_button {
        padding: 0.15em 0.7em !important;
        border: none !important;
        margin: 0 !important;
    }

    > span a.paginate_button.current {
        background: #cbcccf !important;
        color: #fff !important;
        border-radius: 0;
    }

    a.paginate_button + a.paginate_button {
        border-left: 1px solid #cbcccf !important;
    }

    a.previous {
        border: none !important;
    }

    a.next {
        border: none !important;
    }
}
</style>
