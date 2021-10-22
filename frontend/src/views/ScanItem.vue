<template>
    <p>Sanning item</p>
    <div class="qrCodeView">
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
    data() {
        return {
            scanned: false,
        };
    },
    methods: {
        async onDecode(decodedString) {
            try {
                if (decodedString) {
                    let json = JSON.parse(decodedString);
                    console.log(json);
                    let itemID = json.itemID;

                    let response = await axios.post(process.env.VUE_APP_API_URL + '/scans', {
                        ItemID: itemID,
                    });
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style>
.qrCodeView {
    width: 100px;
    height: 100px;
}
</style>
