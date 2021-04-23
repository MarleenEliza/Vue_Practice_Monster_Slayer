<template>
  <div id="app">
    <Header title="Vue Monster app"></Header>
    <HealthBar v-for="player in players" :key="player.id" :executor="player">
    </HealthBar>
    players = {{ players }}
    <ControlPannel 
      winner="you" 
      specialAvailable="true"
      :players="players" />
      <BattleLog logs="['test','test2']"></BattleLog>
  </div>
</template>

<script>
import ControlPannel from "./components/ControlPanel.vue";
import Header from "./components/TheHeader.vue";
import HealthBar from "./components/HealthBar.vue";
import BattleLog from "./components/BattleLog.vue";

export default {
  name: "App",
  components: {
    ControlPannel,
    Header,
    HealthBar,
    BattleLog,
  },
  data() {
    return {
      players: [
        { id: 1, name: "You", health: 100, NPC: false},
        { id: 2, name: "Computer", health: 100, NPC:true},
      ]
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}
.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}
</style>
