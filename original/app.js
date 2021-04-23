function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// passing variables?? from HTML
// watcher value === 0 の場合
const app = Vue.createApp({
    data(){
        return {
            healthP: 100,
            healthNPC: 100,
            specialAttackCharge: 0,
            winner: null,
            specialAvailable: true,
            logs: [],
        }
    },
    computed: {
        healthBarStyleP() {
            return { width: this.healthP + '%' };
        },
        healthBarStyleNPC() {
            return { width: this.healthNPC + '%' };
        },
        gameVerdict() {
            if(this.healthP === this.healthNPC){
                return "Draw";
            }
            else if(this.healthNPC > this.healthP){
                return "You lost :(";
            }
            else if(this.healthNPC < this.healthP){
                return "Congratulations";
            }
        },
    },
    watch:{
        healthP(value) {
            if(value <= 0 && this.healthNPC === 0) this.winner = "both";
            else if(value <= 0) this.winner = "NPC";
        },
        healthNPC(value) {
            if(value <= 0 && this.healthP === 0) this.winner = "both";
            else if(value <= 0) this.winner = "You";
        },
        specialAttackCharge(value) {
            if(value >= 3) {
                console.log("value >= 3 || value === 0")
                this.specialAvailable = true;
                this.specialAttackCharge = 0;
            }
        },
    },
    methods: {
        attack(maxDamage, executor) {
            const damage = getRandomValue(5, maxDamage);
            this.addLog(executor, 'attack', damage);
            switch (executor) {
                case "player":
                    if(!this.specialAvailable) this.specialAttackCharge++;
                    this.attack(25, 'NPC');
                    if(this.healthNPC - damage > 0){
                        this.healthNPC-=damage;
                        break;
                    }
                    this.healthNPC = 0;
                    break;
                    
                case "NPC":
                    if(this.healthP - damage > 0){
                        this.healthP-= damage
                        break;
                    }
                    this.healthP = 0;
                    break;
            }
        },
        heal() {
            if(!this.specialAvailable) this.specialAttackCharge++;
            const hp = getRandomValue(5, 40);
            this.addLog('player', 'heal', hp);
            this.healthP + hp > 100 ? this.healthP = 100 : this.healthP += hp;
            this.attack(25, 'NPC');
        },
        reset() {
            this.winner = null;
            this.specialAttackCharge = 3;
            this.healthNPC = 100;
            this.healthP = 100;
            this.logs = [];
        },
        surrender() {
            this.addLog('player', 'surrender')
            this.winner = "NPC";
        },
        addLog(executor, action, value = null) {
            this.logs.unshift({
                actionBy: executor,
                actionType: action,
                actionValue: value
            })
        }
    },
});

app.mount('#game');