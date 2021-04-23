<template>
  <section class="executor">
    <h2>{{ executor.name }} Health</h2>
    <div class="healthbar">
      <div
        class="healthbar__value"
        :style="'healthBarStyle' + executor.name"
      ></div>
      test
    </div>
  </section>
</template>

<script>
export default {
  props: {
    executor: String,
  },
};
</script>

<style scoped>
    .healthbar {
    width: 100%;
    height: 40px;
    border: 1px solid #575757;
    margin: 1rem 0;
    background: #fde5e5;
    }

    .healthbar__value {
    background-color: #00a876;
    width: 100%;
    height: 100%;
    }
</style>
