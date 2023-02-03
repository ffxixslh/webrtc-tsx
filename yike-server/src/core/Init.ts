import path from 'path'
import Koa from 'koa'
import http from 'http'
import koaCors from 'koa2-cors'
import koaBodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import session from 'koa-session'
import Config from '@/config/Config'
import catchError from '@/middlewares/catchError'
import { getAllFilesExport } from '@/common/utils/utils'
import { updateRedisRole } from '@/server/auth'
import { initPlugin } from '@/plugin'

class Init {
  public static app: Koa
  public static server: http.Server
  public static initCore(
    app: Koa<Koa.DefaultState, Koa.DefaultContext>,
    server: http.Server,
  ) {
    Init.app = app
    Init.server = server
    Init.loadCors()
    Init.loadBodyParser()
    Init.initCatchError()
    Init.loadSession()
    Init.initLoadRouters()
    Init.updateRedisRole()
    Init.initPlugin()
  }

  // 加载 cors 模块
  public static loadCors() {
    Init.app.use(koaCors())
  }

  // 解析body参数
  public static loadBodyParser() {
    Init.app.use(koaBodyParser())
  }

  // http路由加载
  static async initLoadRouters() {
    const dirPath = path.join(`${process.cwd()}/${Config.BASE}/api/`)
    getAllFilesExport(dirPath, (file: Router) => {
      Init.app.use(file.routes())
    })
  }

  // 错误监听和日志处理
  public static initCatchError() {
    Init.app.use(catchError)
  }

  // 加载session
  public static loadSession() {
    Init.app.keys = ['yike server']
    Init.app.use(
      session(
        {
          key: 'koa:sess', //cookie key (default is koa:sess)
          maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
          overwrite: true, //是否可以overwrite    (默认default true)
          httpOnly: false, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
          signed: true, //签名默认true
          rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
          renew: false, //(boolean) renew session when session is nearly expired,
        },
        Init.app,
      ),
    )
  }

  // 更新redis里的角色数据
  public static updateRedisRole() {
    updateRedisRole()
  }

  public static initPlugin() {
    initPlugin({
      pluginNames: ['SocketServer'],
      app: Init.app,
      server: Init.server,
    })
  }
}

export default Init.initCore
