const app = new Vue({
    el: '#app',
    data: {
        title: 'NestJS Chat Real Time',
        name: 'Default User Name',
        text: '',
        selected: 'general',
        messages: [],
        socket: null,
        activeRoom: '',
        rooms: {
            general: false,
            roomA: false,
            roomB: false,
            roomC: false,
            roomD: false,
        },
        listRooms: [
            "general",
            "roomA",
            "roomB",
            "roomC",
            "roomD"
        ],
        isDisabled: true,
        clientCount: 0
    },
    methods: {

        onChange(event) {
            this.socket.emit('leaveRoom', {
                name: this.name,
                room: this.activeRoom
            });
            this.activeRoom = event.target.value;
            this.socket.emit('joinRoom', {
                name: this.name,
                room: this.activeRoom
            });
        },
    
        sendMessage() {
            if(this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text,
                    room: this.activeRoom
                };
                this.socket.emit('msgToServer', message);
                this.text = '';
            }
        },

        receivedMessage(message) {
            this.messages.push(message)
        },

        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        },

        check() {
            if (this.isMemberOfActiveRoom) {
                this.socket.emit('leaveRoom', {
                    name: this.name,
                    room: this.activeRoom
                });
            } else {
                this.socket.emit('joinRoom', {
                    name: this.name,
                    room: this.activeRoom
                });
            }
        },

        onNameChange(event) {
            if (this.name == '') {
                this.isDisabled = true;
            } else {
                this.isDisabled = false;
            }
        }
    },

    computed: {
        isMemberOfActiveRoom() {
            return this.rooms[this.activeRoom];
        }
    },

    created() {
        this.activeRoom = this.selected;
        this.socket = io('http://localhost/chat', {transports: ['websocket']});

        this.socket.on('msgToClient', (message) => {
            console.log(message);
            this.receivedMessage(message);
        });

        this.socket.on('roomMsg', (message) => {
            console.log(message);
            this.receivedMessage(message);
            this.clientCount = message.count;
        });
    
        this.socket.on('connect', () => {
            console.log('connect');
            this.check();
        });
    
        this.socket.on('joinedRoom', (room) => {
            console.log(room);
            this.rooms[room] = true;
        });
    
        this.socket.on('leftRoom', (room) => {
            console.log(room);
            this.rooms[room] = false;
        });
    }
});