import Vue from 'vue'
import App from './App.vue'
import StartPage from './Components/StartPage.vue'
import Level from './Components/Level.vue'
import Result from './Components/ResultPage.vue'
import Answer from './Components/Answer.vue'
import FinalResult from './Components/FinalResult.vue'
import TimerTime from './Components/TimerTime.vue'


Vue.component('FirstPage', StartPage);
Vue.component('Level', Level);
Vue.component('ResultLevel', Result);
Vue.component('Answer', Answer);
Vue.component('FinalResult', FinalResult);
Vue.component('TimerTime', TimerTime);



new Vue({
  el: '#app',
  render: h => h(App)
});
