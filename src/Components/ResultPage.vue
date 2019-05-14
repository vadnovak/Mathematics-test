<template>
  <div class="content">
    <h2>Результат {{currentLevel + 1}} уровня</h2>
    <h3>Правильных ответов: {{statusInLevel}}</h3>
    <div class="buttons">
      <button v-if="countLevels > currentLevel + 1" @click="levelAfter">Следующий уровень</button>
      <button @click="finalRes">Закончить</button>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['currentLevel', 'statusInLevel','countLevels'],
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
