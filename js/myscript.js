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
                            date: '12/04/2022 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '12/04/2022 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '12/04/2022 16:15:22',
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
                            date: '03/20/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '03/20/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '03/20/2020 16:35:00',
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
                            date: '03/28/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },

                        {
                            date: '03/28/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },

                        {
                            date: '03/28/2020 16:15:22',
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
            // cariabile per ricerca chats
            search: '',

            // mobile
            hideClass: '',
            showClass: '',

            
        }
    },
    methods: {
        // per selezionare le chat
        chatSelect(value){
            this.index = value;
            if (window.innerWidth < 580) {
                console.log("mobike");
            }
        },

        // // mobile
        // backtomenu(){
        //     this.hideClass = 'd-none';
        //     this.showClass = '';
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
            if(this.chatMemory.toLowerCase().includes("come stai")){
                return 'bene grazie! e tu?';
            }
            if(this.chatMemory.toLowerCase().includes("bene")){
                return 'mi fa piacere!';
            }
            else{
                return "Non ho capito"
            }

        },
        // get time from date 
        time(date){
            var x = new Date(date);
            return this.addZero(x.getHours())+":"+this.addZero(x.getMinutes());
        },

        //aggiungere uno 0 se il numro è minore di 10 (ex 5 -> 05)
        addZero(num) {
            return num.toString().padStart(2, '0');
        },

        // vedere se la data del messaggio è oggi/ieri e 2 giorni dopo
        //mode = 1 per l'uso in chat
        //mode = none per uso in chatlist
        fullDate(date, mode){
            var x = new Date(date);
            var today = new Date();
            
            //OGGI
            if (x.getFullYear() === today.getFullYear()){
                if (x.getMonth() === today.getMonth()){
                    if (x.getDate() === today.getDate()){
                        if(mode === 1){
                            return "Oggi"
                        }
                        else {
                            return this.time(x)
                        }
                    }     
                }
            }
            

            //IERI
            var seconds = Math.floor(((new Date().getTime()/1000) - (x.getTime()/1000)));
            interval = seconds / 86400;
            if (interval < 2) {
                if(interval >= 1){
                    return "Ieri";
                }
            }
            

            //DOPO 2 GIORNI
            return this.addZero(x.getDate())+"/"+this.addZero(x.getMonth()+1)+"/"+x.getFullYear();
        },

        // funzione per v-if nel chat_date
        // se la data del messagio inviato è uguale al messaggio precendete ritorna falso.
        // altrimenti vero (anche nel caso della prima chat inviata/ricevuta)
        chatDate(date, index, index2){
            var x = new Date(date);
            if (index2 === 0){
                return true
            }
            var y = new Date(this.contacts[index].messages[index2 - 1].date);
            if (x.getFullYear() === y.getFullYear()){
                if (x.getMonth() === y.getMonth()){
                    if (x.getDate() === y.getDate()){
                        return false
                    }     
                }
            }
            return true
        }
    },
    // computed: {
    //     searchbar(){
    //         if(!this.search){
    //             return this.contacts
    //         }
    //         else{
    //             return this.contacts.filter((element) => {

    //                 element.name.toLowerCase().includes(this.search.toLowerCase());

    //             })
    //         }
    //     }
    // },
})

app.mount("#app");
