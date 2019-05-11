<template>
  <div class="content">
    <h2>Ваш результат:</h2>
    <h3>Вы закончили на уровне: {{currentLevel + 1}} </h3>
    <h3>Правильных ответов ({{status}} из {{total}})</h3>
    <div class="buttons">
      <button @click="restart">Начать с начала</button>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['currentLevel', 'status', 'total'],
    data () {
      return {

      }
    },
    methods:{
      restart(){
        this.$emit('restart');
      }

    }
  }

</script>

