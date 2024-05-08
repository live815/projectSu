import tinify from 'tinify'
import fs from 'fs'
import path from 'path'
tinify.key = 'zDScpf7z3yLMKypDs19qKDCgdC2xCbrR'

export default {
  name: 'tinyPNG',
  generateBundle() {
    const projectDirectory = path.resolve(__dirname, '../../src')
    compressImages(projectDirectory)
  }
}

function compressImages(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err

    files.forEach((file) => {
      const filePath = path.resolve(directory, file)

      fs.stat(filePath, (err, stats) => {
        if (err) throw err

        if (stats.isFile()) {
          // 检查文件扩展名，只压缩 .png 和 .jpg 文件
          const extension = path.extname(filePath).toLowerCase()
          if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
            tinify.fromFile(filePath).toFile(filePath, (err) => {
              if (err) throw err

              console.log(`Compressed ${file}`)
            })
          }
        } else if (stats.isDirectory()) {
          // 递归处理子目录
          compressImages(filePath)
        }
      })
    })
  })
}
