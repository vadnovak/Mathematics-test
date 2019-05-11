<template>
  <div
    class="content"
    :class="answerResult ? 'correct' : 'wrong'"
  >
    <h2 v-if="answerResult">Правильный ответ</h2>
    <h2 v-else>Вы ответили не верно</h2>
    <button v-if="resLevel" @click="nextAnswerBut">Следующий вопрос</button>
    <button v-else @click="nextAnswerBut">Результат уровня</button>
  </div>

</template>

<script>
  export default {
    props: ['answerResult', 'resLevel'],
    data () {
      return {

      }
    },
    methods: {
      nextAnswerBut(){
        this.$emit('nextAnswer');

      }
    }
  }

</script>

