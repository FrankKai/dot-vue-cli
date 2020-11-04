<template>
  <div>
  </div>
</template>

<script>
import { {{mapState}} {{mapMutations}} {{mapActions}} } from 'vuex';

export default {
    name: {{ name }},
    data() { return {{ data }} },
    computed: { {{ computed }} },
    watch: { {{ watch }} },
    {{beforeCreate}},
    {{created}},
    {{beforeMount}},
    {{mounted}},
    {{beforeUpdate}},
    {{updated}},
    {{beforeDestroy}},
    {{destroyed}},
    methods: { {{ methods }} },
};
</script>

<style lang="scss" scoped></style>