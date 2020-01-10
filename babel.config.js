/*
 * @Date: 2020-01-09 10:39:39
 * @LastEditors: hxz
 * @LastEditTime: 2020-01-09 11:41:18
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
};
