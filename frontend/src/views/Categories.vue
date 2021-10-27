<template>
    <DataTable :value="categories">
        <Column field="Name" header="Item"></Column>
        <Column field="Description" header="Description"></Column>
    </DataTable>

    <create :BTN_txt="'Add category'" @created="categoryAdded" />
</template>

<script>
import axios from '@/apiClient';
import create from '@/components/createCategory';

export default {
    name: 'Categories',
    components: {
        create,
    },
    data() {
        return {
            categories: [],
        };
    },
    methods: {
        categoryAdded(name, desc) {
            console.log('category added');
            console.log(name, desc);
        },
    },
    async created() {
        try {
            let response = await axios.get('/categories');
            console.log(response.data);
            this.categories = response.data;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style></style>
