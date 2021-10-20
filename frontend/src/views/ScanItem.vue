<template>
    <div>
        <QrStream @decode="onDecode" />
    </div>
</template>

<script>
import { QrStream } from 'vue3-qr-reader';
import axios from 'axios';

export default {
    components: {
        QrStream,
    },
    methods: {
        async onDecode(decodedString) {
            try {
                let json = JSON.parse(decodedString);
                console.log(json);
                let itemID = json.itemID;

                let response = await axios.post(process.env.VUE_APP_API_URL + 'scans', {
                    ItemID: itemID,
                });
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style></style>
