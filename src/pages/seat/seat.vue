<template>
  <div id="seat">
    <cinema-seat-choose></cinema-seat-choose>
  </div>
</template>

<script>
  import cinemaSeatChoose from '@c/common/seat/seat'
  export default {
    name: 'seat',
    components:{
      cinemaSeatChoose
    }
  }
</script>
