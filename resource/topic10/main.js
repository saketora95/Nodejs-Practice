const app = new Vue({
    el: '#app',
    data: {
        title: 'Env Data with NestJS & MQTT',
        humidity: {
            value: 'Not update yet',
            timestamp: 'Not update yet'
        },
        temperature: {
            value: 'Not update yet',
            timestamp: 'Not update yet'
        },
        socket: null,
    },

    created() {
        this.activeRoom = this.selected;
        this.socket = io('http://localhost/env-data', {transports: ['websocket']});

        this.socket.on('emitHumi', (env_data) => {
            console.log(env_data);
            this.humidity.value = env_data.value;
            this.humidity.timestamp = env_data.timestamp;
        });

        this.socket.on('emitTemp', (env_data) => {
            console.log(env_data);
            this.temperature.value = env_data.value;
            this.temperature.timestamp = env_data.timestamp;
        });
    
        this.socket.on('connect', () => {
            console.log('Socket.IO Connect');
        });
    }
});