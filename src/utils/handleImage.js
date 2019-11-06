/*
 * @Author: your name
 * @Date: 2019-10-31 15:55:02
 * @LastEditTime: 2019-11-04 15:37:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\utils\handleImage.js
 */

/**
 * 压缩裁剪图片
 */
/**
 * @description: 压缩裁剪图片
 * @param {
 *  file : 图片file对象
 * }
 * @return:{
 *      base64 ：裁剪后的base64格式,
 *      blob   : 裁剪后的blob对象
 *  }
 */
function resizeImage(file) {
  return new Promise(function(resolve, reject) {
    console.log('464')
    var reader = new FileReader() // 用于异步读取存储在用户计算机的文件 使用file或blob指定文件

    reader.readAsDataURL(file) // 读取文件，返回base64

    reader.onload = function() {
      var img = new Image() // 创建一个image

      img.src = this.result // 绑定节点的result

      img.onload = function() {
        const w = this.naturalWidth // 图片的实际宽度
        const h = this.naturalHeight // 图片的实际高度
        let offsetX = 0
        const canvasSize = 150
        let offsetY = 0
        const imageSize = Math.min(w, h)
        // 如果是个正方形，则直接进行缩放,否则进行裁剪
        if (w !== h) {
          if (w > h) {
            offsetX = (w - h) / 2
          } else {
            offsetY = (h - w) / 2
          }
        }

        var canvas = document.createElement('canvas') // 创建canvas

        canvas.width = canvasSize // 设置宽度
        canvas.height = canvasSize // 设置高度

        var ctx = canvas.getContext('2d') // 获取canvas的上下文

        ctx.drawImage(img, offsetX, offsetY, imageSize, imageSize, 0, 0, canvasSize, canvasSize) // 进行裁剪

        var base64 = canvas.toDataURL(file.type, 1) // file.tpe为图片转为Base64的类型
        canvas.toBlob((blob) => {
          resolve({ base64, blob })
        }, file.type, 1)
      }
    }
  })
}

/**
 * 将图片的base64字符串转换为Blob对象
 */
function convertToBlob(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader() // 用于异步读取存储在用户计算机的文件 使用file或blob指定文件

    reader.readAsDataURL(file) // 读取文件，返回base64

    reader.onload = function() {
      var img = new Image() // 创建一个image

      img.src = this.result // 绑定节点的result

      img.onload = function() {
        const w = this.naturalWidth // 图片的实际宽度
        const h = this.naturalHeight // 图片的实际高度
        let offsetX = 0
        const canvasSize = 150
        let offsetY = 0
        const imageSize = Math.min(w, h)
        // 如果是个正方形，则直接进行缩放,否则进行裁剪
        if (w !== h) {
          if (w > h) {
            offsetX = (w - h) / 2
          } else {
            offsetY = (h - w) / 2
          }
        }

        var canvas = document.createElement('canvas') // 创建canvas

        canvas.width = canvasSize // 设置宽度
        canvas.height = canvasSize // 设置高度

        var ctx = canvas.getContext('2d') // 获取canvas的上下文

        ctx.drawImage(img, offsetX, offsetY, imageSize, imageSize, 0, 0, canvasSize, canvasSize) // 进行裁剪

        var base64 = canvas.toDataURL(file.type, 1) // file.tpe为图片转为Base64的类型
        canvas.toBlob((blob) => {
          resolve({ base64, blob })
        }, file.type, 1)
      }
    }
  })
}

export { resizeImage, convertToBlob }
