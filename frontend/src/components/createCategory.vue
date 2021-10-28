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
            <br />
            <Button @click="btnAdd" class="floatRight">Create</Button>
        </div>
    </Dialog>
</template>

<script>
import axios from '@/apiClient';

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

        async btnAdd() {
            try {
                let response = await axios.post('/categories', {
                    Name: this.name,
                    Description: this.desc,
                });
                console.log('New category', response);
                this.$emit('created');
                this.$toast.add({ severity: 'success', summary: 'Created', detail: 'Category ' + this.name + ' has been created', life: 3000 });
                this.display = false;
            } catch (error) {
                console.log(error);

                if (error.response.status === 400) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Name is properly empty', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Unknown error', detail: 'Something went wrong', life: 3000 });
                }
            }
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

.floatRight {
    float: right !important;
}
</style>
