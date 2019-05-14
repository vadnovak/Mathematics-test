<template>
  <div id="app">
    <h1>{{h1}}</h1>
    <hr>
    <div class="statusBar">
      <div
        class="statusPersent" :style="{'max-width': this.percent+'%'}"

      ></div>
    </div>

    <transition name="fade" mode="out-in">
      <first-page v-if="appState === 'StartPage'"
                  @start="begin"
      ></first-page>

      <Level    v-else-if="appState === 'Level'"
                :currentLevel="currentLevel"
                :answersCount="levels[currentLevel].answersCount"
                :valueMin="levels[currentLevel].valueMin"
                :valueMax="levels[currentLevel].valueMax"
                @level="appCorrect"
                @addTime="addTimer"

      ></Level>

      <Answer v-else-if="appState === 'Answer'"
              :answerResult="answerResult"
              :resLevel="resLevel"
              @start="begin"
              @nextAnswer="levelAfter"

      ></Answer>

      <ResultLevel v-else-if="appState === 'Result'"
                   :countLevels="levels.length"
                   :currentLevel="currentLevel"
                   :statusInLevel="statusInLevel"
                   @levelAfterEmit="nextLevel"
                   @finalRes="finalRes"
      ></ResultLevel>

      <FinalResult v-else-if="appState === 'FinalResult'"
                   :currentLevel="currentLevel"
                   :status="status"
                   :total="total"
                   @restart="reStart"
      ></FinalResult>
      <!--нужно использовать v-show -->
      <TimerTime    v-else-if="appState === 'TimerTime'"
                    @finalRes="finalRes"
      ></TimerTime>
    </transition>

  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        h1: 'Математический тренажер',
        currentLevel: 0,          //текущий уровень
        appState: 'StartPage',    //выбор страници
        statAnswers: [],          //ответы пользователя
        answerResult: '',         //ответ пользователя
        answerInTheLevel: 0,      //ответ в уровне
        status: 0,                //количество правильных ответов
        statusInLevel: 0,         //количество правильных ответов в уровне
        percent: 0,               //процент заполнения статусбара
        total: 0,                 //общее количество вопросов
        resLevel: true,           //if следующий вопрос
        levels: [                 //настройки уровней
          {
            answersCount: 2,      //количество вариантов ответов
            valueMin: 10,         //мин число для рандома
            valueMax: 99,         //макс число для рандома
            questionsCount: 2,    //количество вопросов
          },
          {
            answersCount: 3,
            valueMin: 10,
            valueMax: 200,
            questionsCount: 3,
          },
          {
            answersCount: 3,
            valueMin: 100,
            valueMax: 500,
            questionsCount: 3,
          },
          {
            answersCount: 2,
            valueMin: 500,
            valueMax: 999,
            questionsCount: 3,
          },
          {
            answersCount: 3,
            valueMin: 100,
            valueMax: 1999,
            questionsCount: 4,
          },
        ]
      }
    },
    methods: {
      begin() {                               //переход на уровень
        this.appState = 'Level';
        this.currentLevel = 0;
        this.statusInLevel = 0;
      },
      
      appCorrect(val) {                       //получение варианта ответа true/false
        this.answerResult = val.correct;

        this.statAnswers.push(                //добавление инфо в объект
          {
            id:         this.currentLevel,    //номер уровня
            correct:    val.correct,          //вариант ответа
            numAnswer:  this.answerInTheLevel //номер ответа в уровне
          }
        );
        this.answerInTheLevel++;              //увеличение номера ответа в уровне
        this.total++;                         //общее количество вопросов
        this.appState = 'Answer';             //переход на станицу с ответом
          //заполнение прогрессбара
        this.percent = 100/this.levels[this.currentLevel].questionsCount;
        this.percent = this.percent*this.answerInTheLevel;
          /*    Подсчет правильных ответов в уровне    */
        if (this.answerResult) {
          this.statusInLevel++;
        }
      },

      nextLevel(){                        //следующий уровень
        this.appState = 'Level';
        this.answerInTheLevel = 0;        //обнуление ответ в уровне
        this.currentLevel++;              //следующий уровень
        this.resLevel = true;             //переключение кнопки (следующий вопрос/уровень)
        this.percent = 0;                 //обнуление процнта в прогресбаре
        this.statusInLevel = 0;           //обнуление правильных ответов в уровне
      },

      levelAfter(){
        this.appState = 'Level';
        if (this.answerInTheLevel === this.levels[this.currentLevel].questionsCount){
          this.appState = 'Result';
          /* правильные ответы в уровне */
        } else if (this.answerInTheLevel === this.levels[this.currentLevel].questionsCount - 1) {     //
          this.resLevel = false;
        }
      },

      finalRes(){                                 //Финальный результат
        this.appState = 'FinalResult';
        this.resultStatus();
      },

      reStart(){                                  //Начать сначала
        this.appState = 'StartPage';
        this.total = 0;
        this.answerInTheLevel = 0;
        this.percent = 0;
      },

      addTimer(){                                 //компонент с таймером (на будущее)
        this.appState = 'TimerTime';
      },

      resultStatus(){                             //количество правильных ответов (общее)
        for (let i = 0; i < this.statAnswers.length; i++) {
          if (this.statAnswers[i].correct) {
            this.status++;
          }
        }
      },
    }
  }
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80%;
  margin: 60px auto;
}

h1, h2 {
  font-weight: normal;
  font-size: 42px;
}
.statusBar{
  height: 15px;
  width: 100%;
  border: 1px solid moccasin;
  border-radius: 7px;
  background-color: cornsilk;
  margin: 25px 0;
}
.statusPersent {
  background-color: orange;
  height: 15px;
  border-radius: 7px;
  transition: 1s;
}
.content {
  height: 50vh;
  width: 100%;
  border: 1px solid moccasin;
  border-radius: 7px;
  background-color: cornsilk;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
button {
  display: block;
  padding: 12px 30px;
  background-color: orange;
  color: #fff;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 7px;
  transition: 0.3s;
  outline: none;
}
button:hover {
    transform: scale(1.05);
    box-shadow: 4px 7px 7px rgba(0,0,0,0.1);
}
.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wrong {
  background-color: lightcoral;
}
.correct {
  background-color: darkseagreen;
}

</style>
