# dot-vue-cli

Vue2.x single file component .vue generator.

### features

1. Set `name`, `props`, `data`, `computed`, `watch` and choose `lifecycles`, `methods` by interactive command line.
2. Import vuex, `mapState`, `mapMutations`, `mapActions` by interactive command line.

### install
```shell
npm install -g dot-vue-cli
```

### usage

```shell
dot-vue
```

Type `dot-vue` in terminal and follow the instructions.


![](https://media.giphy.com/media/E8eIEQzZDYj2deWFEH/giphy.gif)


### process

#### 1.generate template configs

```js
{
  filename: "foo",
  name: "foo",
  data: true,
  "data details": "a,b,c",
  computed: true,
  "computed details": "a,b,c",
  watch: true,
  "watch details": "a,b,c",
  methods: true,
  "methods details": "a,b,c",
  "vue lifecycle hooks": ["mounted", "destroyed"],
  "vuex helpers": ["mapState", "mapMutations", "mapActions"],
};
```

#### 2.generate target .vue file based on template literals
```html
<!--template  literals-->
<template>
  <div></div>
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

<style lang="scss" scoped></style>
```

```html
<!--target .vue file-->
<template>
  <div></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "foo",
  
  data() {
    return { a: "", b: "", c: "" };
  },
  computed: { a() {}, b() {}, c() {} },
  watch: { a() {}, b() {}, c() {} },



  mounted() {},



  destroyed() {},
  methods: { a() {}, b() {}, c() {} },
};
</script>

<style lang="scss" scoped></style>
```

Enjoy it !