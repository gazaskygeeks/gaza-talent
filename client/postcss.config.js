module.exports = {
  plugins: [
    require("postcss-nested"),
    require("autoprefixer"),
    require("postcss-import"),
    require("postcss-custom-media"),
    require("postcss-custom-properties"),
    require("postcss-preset-env")
  ]
};
