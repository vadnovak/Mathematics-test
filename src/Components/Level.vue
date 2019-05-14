<template>

    <div class="content">
      <div class="timer">
        <p>Время на ответ:</p>
        <p class="num">{{currentTime}}</p>
        <p> cек.</p>
      </div>
      <h2>Уровень {{currentLevel + 1}}</h2>
      <h3>{{val1}} + {{val2}} = ?</h3>
      <div class="buttons">
        <button @click="userAns(val)" v-for="val in answers">{{ val }}</button>
      </div>
    </div>

</template>

<script>
  export default {
    props: ['currentLevel', 'answersCount', 'valueMin', 'valueMax'],
    data () {
      return {
        currentTime: 15,                 //время на ответ
        timer: null,
        answerAll: [],                   //числа для вариантов ответов
        val1: this.randomInteger( this.valueMin, this.valueMax ),
        val2: this.randomInteger( this.valueMin, this.valueMax ),
        userAnswer: [],
      }
    },
    methods: {
      randomInteger( a, b ){            //генерация случайного числа
        let rand = a + Math.random() * (b + 1 - a);
            rand = Math.floor(rand);
        return rand;
      },
      userAns(val){                     //отправка в app.vue варианта ответа
        if ( val === this.result ) {
          this.$emit('level', {correct: true} );
        } else {
          this.$emit('level', {correct: false} );
          }
      },
      startTimer() {
        this.timer = setInterval(() => {
          this.currentTime--
        }, 1000)
      },
      stopTimer() {
        clearTimeout(this.timer)
      },

    },
    mounted() {                 //старт таймера при загрузке страницы
      this.startTimer()
    },
    destroyed() {               //выключение таймера при 0 или уничтожении компонента
      this.stopTimer()
    },
    watch: {                    //если таймер 0 - остановить отсчет
      currentTime(time) {
        if (time === 0) {
          this.stopTimer();
          // this.$emit('addTime');
          this.$emit('level', {correct: false} );
        }
      }
    },
    computed: {
      result() {                              //правильный ответ
        return this.val1 + this.val2;
      },
      answers() {                             //генерация неверного ответа
        let arr = [this.val1 + this.val2],
            randomVal;
          while ( arr.length !== +this.answersCount ) {
            randomVal = this.randomInteger(this.result - (this.result * 0.1), this.result + (this.result * 0.1));
            if ( arr.indexOf( randomVal ) === -1)
              arr.push( randomVal );
          }
        function compareRandom( a, b ) {
          return Math.random() - 0.5;
        }
        arr.sort( compareRandom );            //перемешивание масива с ответами
        return arr;
      },
    },
  }



</script>

<style scoped>
  .timer {
    width: 90%;
    justify-content: flex-end;
    display: flex;
  }
  p {
    display: block;
    font-weight: bold;
    font-size: 24px;
  }
  .num{
    padding: 0 10px;
    color: limegreen;
  }

</style>
