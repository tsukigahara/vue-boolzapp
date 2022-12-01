const app = Vue.createApp({
    data() {
        return {

            //DATA
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                }
            ],
            //index per selezionare le chat
            index: 0,
            //variabile per l'input della chat
            chatInput: '',
            //variabile per memorizzare l'input della chat
            chatMemory: '',

            
        }
    },
    methods: {
        // per selezionare le chat
        chatSelect(value){
            this.index = value;
        },
        // lastArr(array){
        //     last = array.length - 1;
        //     return last;
        // },

        // per spedire i messagi
        send(){
            if (this.chatInput !== ''){
                this.contacts[this.index].messages.push({
                     date: new Date(),
                     message: this.chatInput, status: 'sent' 
                    });
                setTimeout(this.received, 3000);
                this.chatMemory = this.chatInput;
                this.chatInput = '';
            }
            console.log(this.contacts[this.index].messages);
        },

        // per ricevere i messaggi
        received(){
            this.contacts[this.index].messages.push({
                date: new Date(),
                message: this.replyBot(),
                status: 'received' });
        },

        // per le risposte automatiche
        replyBot(){
            console.log(this.chatMemory);
            if(this.chatMemory.toLowerCase().includes("ciao")){
                return 'Ciao!';
            }
            else{
                return "Non ho capito"
            }

        }
    },
})

app.mount("#app");
