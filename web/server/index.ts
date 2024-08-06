import express from 'express'
import path from 'path'
import open from 'open'
import getPort from 'get-port'

let app: express.Application

export const startWebProject = async (data: any): Promise<void> => {
  app = express()
  const port = await getPort({ port: [3000, 3001, 3002] })

  // 设置静态文件目录为Vue构建后的dist目录
  const publicDir = path.join(__dirname, '../../dist')

  console.log(publicDir, 'publicDir')

  app.use(express.static(publicDir))

  app.use(express.json())

  // 提供一个API接口获取graphData
  app.get('/api/graph-data', (req, res) => {
    res.json(data)
  })

  // 默认路由
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'))
  })

  app.listen(port, () => {
    console.log(`Web project is running at http://localhost:${port}`)
  })
  open(`http://localhost:${port}`)
}
