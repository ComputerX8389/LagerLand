<template>
    <div class="p-grid">
        <div class="p-col-12">
            <DataTable :value="categories">
                <Column field="Name" header="Item"></Column>
                <Column field="Description" header="Description"></Column>
            </DataTable>
        </div>

        <div class="p-col-12">
            <create @created="updateCategoryies" />
        </div>
    </div>
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
        async updateCategoryies() {
            console.log('category added');

            try {
                let response = await axios.get('/categories');
                console.log(response.data);
                this.categories = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.updateCategoryies();
    },
};
</script>

<style scoped></style>
