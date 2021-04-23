<template>
  <section id="log" class="container">
    <h2>Battle Log</h2>
    <ul>
      <li v-for="log in logs" :key="log.id">
        {{log.id}} {{ log.actionBy }} {{ log.actionType }}ed ({{
          log.actionType === "heal" ? "+" : "-"
        }}{{ log.actionValue }})
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    logs: Array,
  },
  methods: {
    addLog(executor, action, value = null) {
      this.logs.unshift({
        actionBy: executor,
        actionType: action,
        actionValue: value,
      });
    },
  },
};
</script>
