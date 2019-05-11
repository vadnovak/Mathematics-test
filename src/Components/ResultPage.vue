<template>
  <div class="content">
    <h2>Результат {{currentLevel + 1}} уровня</h2>
    <h3>Правильных ответов: </h3>
    <div class="buttons">
      <button @click="levelAfter">Следующий уровень</button>
      <button @click="finalRes">Закончить</button>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['currentLevel'],
    data () {
      return {

      }
    },
    methods:{
      levelAfter(){
        this.$emit('levelAfterEmit');
      },
      finalRes(){
        this.$emit('finalRes');
      }

    }
  }

</script>
