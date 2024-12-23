import KoaRouter from 'koa-router'
import { Models } from '@/common/typings/model'
import Config from '@/config/Config'
import { HttpException, Success } from '@/core/HttpException'
import { sendEmail } from '@/server/mailer'
import { command } from '@/server/mysql'
import validator from '@/middlewares/validator'
import schema from '@/common/apiJsonSchema/system/auth/sendCodeEmail'

const router = new KoaRouter({
  prefix: `${Config.API_PREFIX}v1/system/auth`,
})

router.post(
  '/sendCodeEmail',
  validator(schema, 'body'),
  async (ctx: Models.Ctx) => {
    const { email, userName } = ctx.request.body as any
    await checkUserNameAndEmail(userName, email)

    let code: string

    if (process.env.NODE_ENV !== 'development') {
      code = (Math.random() * 1000000).toFixed()
      if (code.length < 6) {
        code += 0
      }
    } else {
      code = '123456'
    }

    // 在会话中添加验证码字段code
    ctx.session!.code = code
    console.log('邮件验证码:', ctx.session!.code, typeof ctx.session!.code)

    if (process.env.NODE_ENV !== 'development')
      // 发送邮件
      await sendEmail({
        to: email,
        subject: '验证码',
        text: '验证码',
        html: `
            <div style="width: 100%;height: 100%;display: flex;place-items: center;">
                <p>您正在注册逸课平台帐号，用户名<b>${userName}</b>，
                验证邮箱为<b>${email}</b> 。
                验证码为：</p>
                <p style="color: green;font-weight: 600;margin: 0 6px;text-align: center; font-size: 20px">
                  ${code}
                </p>
                <p>请在注册页面填写该改验证码</p>
            </div>
        `,
      })

    throw new Success()
  },
)

export default router

/**
 * 邮箱和用户名作为唯一值需要校验是否已经有用户在使用
 * @param { string } userName
 * @param { string } email
 * @returns
 */
async function checkUserNameAndEmail(userName: string, email: string) {
  return new Promise(async (resolve, reject) => {
    const res = await command(`
      SELECT
        user_name,
        email
      FROM
        system_user
      where
        user_name = '${userName}'
      or
        email = '${email}'
    `)
    if (res.results.length > 0) {
      const userNameList = res.results.filter(
        (item: { userName: any }) => item.userName === userName,
      )
      const emailList = res.results.filter(
        (item: { email: any }) => item.email === email,
      )
      const msgList = []
      if (userNameList.length > 0) {
        msgList.push('该用户名已被注册')
      }
      if (emailList.length > 0) {
        msgList.push('该邮箱已被注册')
      }
      reject(msgList.join(','))
    } else {
      resolve(undefined)
    }
  }).catch((err) => {
    throw new HttpException('', err)
  })
}
