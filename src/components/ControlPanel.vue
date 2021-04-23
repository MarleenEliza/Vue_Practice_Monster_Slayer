<template>
  <section id="controls">
    <move-button @click="attack(20, players.id = 1)">ATTACK</move-button>
    <move-button
      :disabled="!specialAvailable"
      @click="
        attack(30, 'player');
        specialAvailable = false;
      "
    >
      SPECIAL ATTACK
    </move-button>
    <move-button @click="heal">HEAL</move-button>
    <move-button @click="surrender">SURRENDER</move-button>
  </section>
</template>

<script>
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default {
  props: {
    winner: String,
    specialAvailable: Boolean,
    executor: String,
    players: Array,
  },
  watch: {
    healthP(value) {
      if (value <= 0 && this.healthNPC === 0) this.winner = "both";
      else if (value <= 0) this.winner = "NPC";
    },
    healthNPC(value) {
      if (value <= 0 && this.healthP === 0) this.winner = "both";
      else if (value <= 0) this.winner = "You";
    },
    specialAttackCharge(value) {
      if (value >= 3) {
        this.specialAvailable = true;
        this.specialAttackCharge = 0;
        console.log("watched");
      }
    },
  },
  methods: {
    attack(maxDamage, executor) {
      const damage = getRandomValue(5, maxDamage);
      this.addLog(executor, "attack", damage);
      switch (executor) {
        case "player":
          if (!this.specialAvailable) this.specialAttackCharge++;
          this.attack(25, "NPC");
          if (this.healthNPC - damage > 0) {
            this.healthNPC -= damage;
            break;
          }
          this.healthNPC = 0;
          break;

        case "NPC":
          if (this.healthP - damage > 0) {
            this.healthP -= damage;
            break;
          }
          this.healthP = 0;
          break;
      }
    },
    heal() {
      if (!this.specialAvailable) this.specialAttackCharge++;
      const hp = getRandomValue(5, 40);
      this.addLog("player", "heal", hp);
      this.healthP + hp > 100 ? (this.healthP = 100) : (this.healthP += hp);
      this.attack(25, "NPC");
    },
    reset() {
      this.winner = null;
      this.specialAttackCharge = 3;
      this.healthNPC = 100;
      this.healthP = 100;
      this.logs = [];
    },
    surrender() {
      this.addLog("player", "surrender");
      this.winner = "NPC";
    },
  },
};
</script>
