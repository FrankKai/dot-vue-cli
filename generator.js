const fs = require("fs");
const shell = require("shelljs");
const template = `<template>
  <div>
  </div>
</template>

<script>
import { {{mapState}} {{mapMutations}} {{mapActions}} } from 'vuex';

export default {
  name: {{ name }},
  props: { {{ props }} },
  {{{data}}} { return {{ data }} },
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

<style lang="scss" scoped></style>`;

module.exports = (configs) => {
  if (!configs.filename) {
    shell.echo("Sorry, this script requires a filename");
    shell.exit(1);
  }

  const file = `${configs.filename}.vue`;
  fs.writeFileSync(`${file}`, template);

  shell.sed("-i", "{{ name }}", JSON.stringify(configs.name), file);

  if (configs.props) {
    const props = configs["props details"]
      .split(",")
      .map((prop) => `${prop}: { type: String },`)
      .join("");

    shell.sed("-i", "{{ props }}", props, file);
  } else {
    shell.sed("-i", "props: { {{ props }} },", "", file);
  }

  if (configs.data) {
    const datas = configs["data details"].split(",");
    let obj = {};
    for (data of datas) {
      obj[data] = "";
    }
    shell.sed("-i", "{{{data}}}", "data()", file);
    shell.sed("-i", "{{ data }}", JSON.stringify(obj), file);
  } else {
    shell.sed("-i", "{{{data}}}", "", file);
    shell.sed("-i", "{ return {{ data }} },", "", file);
  }

  if (configs.computed) {
    const computeds = configs["computed details"]
      .split(",")
      .map((computed) => `${computed}(){},`)
      .join("");
    shell.sed("-i", "{{ computed }}", computeds, file);
  } else {
    shell.sed("-i", "computed: { {{ computed }} },", "", file);
  }

  if (configs.watch) {
    const watches = configs["watch details"]
      .split(",")
      .map((watch) => `${watch}(){},`)
      .join("");

    shell.sed("-i", "{{ watch }}", watches, file);
  } else {
    shell.sed("-i", "watch: { {{ watch }} },", "", file);
  }

  if (configs.methods) {
    const methods = configs["methods details"]
      .split(",")
      .map((method) => `${method}(){},`)
      .join("");
    shell.sed("-i", "{{ methods }}", methods, file);
  } else {
    shell.sed("-i", "methods: { {{ methods }} },", "", file);
  }

  const lifecycleSet = new Set([
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestroy",
    "destroyed",
  ]);
  if (configs["vue lifecycle hooks"].length > 0) {
    for (const lifecycle of configs["vue lifecycle hooks"]) {
      const regex = `{{${lifecycle}}}`;
      shell.sed("-i", regex, `${lifecycle}(){}`, file);
      lifecycleSet.delete(lifecycle);
    }
  }
  for (const lifecycle of [...lifecycleSet]) {
    const regex = `{{${lifecycle}}},`;
    shell.sed("-i", regex, "", file);
  }
  if (configs["vuex helpers"].length === 0) {
    shell.sed(
      "-i",
      "import { {{mapState}} {{mapMutations}} {{mapActions}} } from 'vuex';",
      "",
      file
    );
    return;
  }

  const vuexHelpersSet = new Set(["mapState", "mapMutations", "mapActions"]);

  if (configs["vuex helpers"].length > 0) {
    for (const helper of configs["vuex helpers"]) {
      const regex = `{{${helper}}}`;
      shell.sed("-i", regex, `${helper},`, file);
      vuexHelpersSet.delete(helper);
    }
  }
  for (const helper of [...vuexHelpersSet]) {
    const regex = `{{${helper}}}`;
    shell.sed("-i", regex, "", file);
  }
};
