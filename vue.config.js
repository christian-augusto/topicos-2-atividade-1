/* eslint-disable */

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/scss/variables";
          @import "@/styles/scss/classes";
          @import "@/styles/scss/mixins";
        `,
      },
    },
  },
});
