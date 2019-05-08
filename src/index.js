import percentageDirective from "./directives/percentage-directive";

function install(Vue, options = {}) {
  console.log(options);
  Vue.directive("percentage", percentageDirective);
}

export default install;
