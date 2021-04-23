<template>
    <header>
     <h1> {{ title }} </h1>
  </header>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #880017;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}
</style>