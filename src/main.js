import Vue from 'vue'
import App from './App.vue'
import MoveButton from './components/UI/MoveButton.vue';

Vue.component('move-button', MoveButton);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
