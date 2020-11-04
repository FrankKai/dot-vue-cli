#!/usr/bin/env node

const inquirer = require("inquirer");
const generator = require("./generator");

console.log("Hi, welcome to Dot Vue");

var questions = [
  {
    type: "input",
    name: "filename",
    message: "What's your .vue filename?",
    validate: function (value) {
      if (value) {
        return true;
      }
      if (value === "template") {
        return "template is a invalid .vue filename";
      }
      return "Please enter a valid .vue filename";
    },
  },
  {
    type: "input",
    name: "name",
    message: "What's your .vue name property?",
    validate: function (value) {
      if (value) {
        return true;
      }
      return "Please enter a valid .vue name property";
    },
  },
  {
    type: "confirm",
    name: "data",
    message: "Do you need data property?",
  },
  {
    type: "input",
    name: "data details",
    message: "Write your data details",
    when(answers) {
      return answers.data;
    },
    validate(value) {
      if (value && value.split(",").length > 0) {
        return true;
      }
      return "Please enter data properties like this: foo,bar,baz";
    },
  },
  {
    type: "confirm",
    name: "computed",
    message: "Do you need computed property?",
  },
  {
    type: "input",
    name: "computed details",
    message: "Write your computed details",
    when(answers) {
      return answers.computed;
    },
    validate(value) {
      if (value && value.split(",").length > 0) {
        return true;
      }
      return "Please enter computed details like this: foo,bar,baz";
    },
  },
  {
    type: "confirm",
    name: "watch",
    message: "Do you need watch property?",
  },
  {
    type: "input",
    name: "watch details",
    message: "Write your watch details",
    when(answers) {
      return answers.watch;
    },
    validate(value) {
      if (value && value.split(",").length > 0) {
        return true;
      }
      return "Please enter watch details like this: foo,bar,baz";
    },
  },
  {
    type: "confirm",
    name: "methods",
    message: "Do you need methods property?",
  },
  {
    type: "input",
    name: "methods details",
    message: "Write your methods details",
    when(answers) {
      return answers.methods;
    },
    validate(value) {
      if (value && value.split(",").length > 0) {
        return true;
      }
      return "Please enter methods details like this: foo,bar,baz";
    },
  },
  {
    type: "checkbox",
    message: "Select vue lifecycle hooks?",
    name: "vue lifecycle hooks",
    choices: [
      {
        name: "beforeCreate",
      },
      {
        name: "created",
      },
      {
        name: "beforeMount",
      },
      {
        name: "mounted",
      },
      {
        name: "beforeUpdate",
      },
      {
        name: "updated",
      },
      {
        name: "beforeDestroy",
      },
      {
        name: "destroyed",
      },
    ],
  },
  {
    type: "checkbox",
    message: "Select vuex helpers？",
    name: "vuex helpers",
    choices: [
      {
        name: "mapState",
      },
      {
        name: "mapMutations",
      },
      {
        name: "mapActions",
      },
    ],
  },
];

inquirer.prompt(questions).then((configs) => {
  console.log("\nOrder receipt:");
  console.log(JSON.stringify(configs, null, "  "));
  generator(configs);
});
