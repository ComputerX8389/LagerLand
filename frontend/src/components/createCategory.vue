<template>
    <Button @click="btnClick">Create category</Button>

    <Dialog header="Create category" v-model:visible="display">
        <div class="minWidth">
            <span class="p-float-label marginTop">
                <InputText id="name" type="text" v-model="name" />
                <label for="name">Name</label>
            </span>

            <p class="descTxt">Description</p>
            <Textarea v-model="desc" :autoResize="true" rows="5" cols="30" />

            <Button @click="btnAdd">Create</Button>
        </div>
    </Dialog>
</template>

<script>
export default {
    name: 'Create',
    data() {
        return {
            name: '',
            desc: '',
            display: false,
        };
    },
    methods: {
        btnClick() {
            this.display = true;
        },

        btnAdd() {
            this.$emit('created', this.name, this.desc);
            this.display = false;
        },
    },
};
</script>

<style scoped>
.marginTop {
    margin-top: 20px;
}

.descTxt {
    font-size: 13px;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-left: 8px;
    color: #6c757d;
}
</style>
