<template>
    <Button type="button" @click="getItem" class="p-button-secondary" icon="pi pi-cog"></Button>
    <Dialog :header="'Edit ' + hype + item.Name + hype" v-model:visible="display">
        <span class="p-float-label marginTop">
            <InputText id="name" type="text" v-model="item.Name" />
            <label for="name">Name</label>
        </span>

        <p class="descTxt">Description</p>
        <Textarea v-model="item.Description" :autoResize="true" rows="5" cols="30" />
        <br />
        <Dropdown v-model="selectedGategory" :options="itemCategories" optionLabel="Name" placeholder="Select a category"></Dropdown>
        <Button @click="btnSave" class="floatRight">Save</Button>
    </Dialog>
</template>

<script>
import axios from '@/apiClient';

export default {
    name: 'editItemDialog',
    props: ['itemID'],
    emits: ['updated'],
    data() {
        return {
            display: false,
            item: {},
            hype: '"', // dump workaround for vue not allowing " in html

            selectedGategory: null,
            itemCategories: [],
        };
    },
    methods: {
        async getItem() {
            this.display = true;
            const response = await axios.get('/items/' + this.itemID);
            console.log('Edit', response);

            this.item = response.data;

            let itemCategories = await axios.get('/categories');
            this.itemCategories = itemCategories.data;

            let test = this.itemCategories.find((x) => x.ID === this.item.CategoryID);
            this.selectedGategory = test;
        },
        async btnSave() {
            this.item.CategoryID = this.selectedGategory.ID;
            const response = await axios.put('/items/' + this.itemID, this.item);
            console.log('Edit', response);
            this.display = false;

            this.$emit('updated');
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
