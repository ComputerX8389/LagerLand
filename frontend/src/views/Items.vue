<template>
    <div class="p-grid">
        <div class="p-col-12">
            <DataTable :value="items">
                <Column field="Name" header="Item"></Column>
                <Column field="Description" header="Description"></Column>
                <Column field="CategoryName" header="Category"></Column>
                <Column field="CheckStatus" header="CheckStatus"></Column>
            </DataTable>
        </div>

        <div class="p-col-12">
            <create @created="updateItems" />
        </div>
    </div>
</template>

<script>
import axios from '@/apiClient';
import create from '@/components/createItem.vue';

export default {
    components: {
        create,
    },
    data() {
        return {
            items: [],
        };
    },
    methods: {
        async updateItems() {
            try {
                let response = await axios.get('/items');
                console.log('Items', response.data);
                this.items = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        this.updateItems();
    },
};
</script>

<style></style>
