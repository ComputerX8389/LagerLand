<template>
    <div class="p-grid">
        <div class="p-col-12">
            <DataTable :value="items">
                <Column field="Name" header="Item"></Column>
                <Column field="Description" header="Description"></Column>
                <Column field="CategoryName" header="Category"></Column>
                <Column field="CheckStatus" header="CheckStatus">
                    <template #body="slotProps">
                        <span v-if="slotProps.data.CheckStatus == 0" class="checkIn check">Checked in</span>
                        <span v-else class="checkOut check">Checked out</span>
                    </template>
                </Column>
                <Column>
                    <template #body="slotProps">
                        <qrDialog :itemID="slotProps.data.ID" :itemName="slotProps.data.Name" />
                    </template>
                </Column>
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
import qrDialog from '@/components/qrDialog.vue';

export default {
    components: {
        create,
        qrDialog,
    },
    data() {
        return {
            items: [],
            value: '{ itemID: 3 }',
            size: 300,
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
        getQrCode(ID) {
            console.log('ID', ID);
        },
    },
    async created() {
        this.updateItems();
    },
};
</script>

<style scoped>
.check {
    border-radius: 2px;
    padding: 0.25em 0.5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.3px;
}
.checkIn {
    background-color: #c8e6c9;
    color: #256029;
}
.checkOut {
    background-color: #ffcdd2;
    color: #c63737;
}
</style>
