<template>
    <div>
        <button @click="disconnect" v-if="status === 'connected'"> 연결 끊기</button>
        <button @click="connect" v-if="status === 'disconnected'"> 연결</button>
        {{ status }} <br>
        <div v-if="status === 'connected'">
            <form @submit.prevent="sendMessage" action="#">
                <input v-model="message">
                <button type="submit">메시지 전송</button>
            </form>
            <ul id="logs">
                <li v-for="log in logs" :key=log class="log">
                    {{log.event}} : {{log.data}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                message: "",
                logs: [],
                status: "disconnected"
            };
        },
        methods: {
            connect() {
                this.socket = new WebSocket("wss://echo.websocket.org");
                this.socket.onopen = () => {
                    this.status = "connected";
                    this.logs.push(
                        {
                            event: "연결 완료 ",
                            data: 'wss://echo.websocket.org'
                        }
                    );
                    this.socket.onmessage = ({data}) => {
                        this.logs.push({event: "메시지 수신", data})
                    };
                }
            },
            disconnect() {
                this.socket.close();
                this.status = "disconnected";
                this.logs = [];
            },
            // eslint-disable-next-line no-unused-vars
            sendMessage(e) {
                this.socket.send(this.message);
                this.logs.push({event: "메시지 전송", data: this.message});
                this.message = "";
            }
        }
    }
</script>

<style scoped>

</style>
