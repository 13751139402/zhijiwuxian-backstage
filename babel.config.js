/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-24 14:17:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/app'
  ],
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
