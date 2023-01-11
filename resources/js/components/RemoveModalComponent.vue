<template>
    <section class="content">
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Remove </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light border border-secondary rounded-0" data-dismiss="modal">Close</button>
                        <a id="removeTrigger" href="#" type="button" @click="triggerRemove" data-id="1" data-dismiss="modal" class="btn btn-secondary border border-secondary rounded-0">Remove</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "RemoveModalComponent",
    props: {
        title: {
            type: String,
            required: true
        }
    },
    emits: ['remove-id'],
    setup(props, context) {
        const triggerRemove = async (e) => {
            context.emit('remove-id', e.target.dataset.id);
        }

        return {
            triggerRemove
        }
    }
}
</script>

<style scoped>

</style>
