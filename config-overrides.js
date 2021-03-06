const {
  override,
  addWebpackAlias,
  addWebpackExternals,
} = require("customize-cra");
const path = require("path");
module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "@@": path.resolve(__dirname, "src/components"),
  }),
  addWebpackExternals({
    react: "react",
  })
);
