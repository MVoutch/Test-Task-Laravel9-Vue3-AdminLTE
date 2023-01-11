<template>
    <div class="container-fluid">
        <div class="row my-3">
            <div :class="addLink ? 'col-sm-6' : ''">
                <h3 class="m-0">
                    {{title}}s
                </h3>
            </div>
            <div v-if="addLink" class="col-sm-6">
                <a :href="addLink" class="px-4 float-sm-right btn btn-sm btn-secondary">Add {{title}}</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "HeaderTableComponent",
    props: {
        title: {
            type: String,
            required: true
        },
        addLink: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>

</style>
