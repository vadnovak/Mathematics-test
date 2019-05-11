<template>

    <div class="content">
      <h2>Готов проверить себя?</h2>
      <button @click="start">НАЧАТЬ</button>
    </div>

</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods:{
      start(){
        this.$emit('start');
      }

    }

  }
</script>
