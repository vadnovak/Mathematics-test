<template>
  <div class="content">
    <h1>Добавить еще 20 сек</h1>
    <div class="buttons">
      <button>Добавить</button>
      <button @click="finalRes">Закончить</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TimerTime.vue",
      methods:{
        finalRes(){
          this.$emit('finalRes');
        }

      }
    }
</script>

<style scoped>

</style>
