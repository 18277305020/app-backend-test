const SMSClient = require('@alicloud/sms-sdk')
const Logger = require("../lib/Logger");

const Redis = require('ioredis');
const redis = new Redis;

const smsConfig = require("../config/sms-config");

const smsClient = new SMSClient({
    accessKeyId: process.env.SMS_ACCESSKEYID,
    secretAccessKey: process.env.SMS_SECRETACCESSKEY
});

//发送验证码
const sendSMSCode = async (req, res) => {
    let phoneNum = req.query.phone;
    let code = Math.random().toString().slice(-6);
    let jsonifiedSmsCode = JSON.stringify({code: code});

    try {

        const smsResult = await redis.get(`sms_${phoneNum}`);

        if (smsResult) {
            return res.status(200).json({
                message: '验证码发送太频繁，请稍后再试',
                code: 1
            })
        }

        const smsRes = await smsClient.sendSMS({
            PhoneNumbers: phoneNum,
            SignName: smsConfig.SignName,
            TemplateCode: smsConfig.TemplateCode,
            TemplateParam: jsonifiedSmsCode
        });

        if (smsRes.Code === 'OK') {
            //await redis.set(`sms_${phoneNum}`, code, 'EX', 60);
            //EX = 存在的时间
            await redis.set(`sms_${phoneNum}`, code, 'EX', 300);

            return res.status(200).json({
                data: {},
                message: "发送验证码成功",
                code: 0
            });
        } else {
            return res.status(401).json({
                message: '发送验证码失败',
                code: 1
            });
        }

    } catch (e) {
        Logger.error("send sms user", e.message);
        return res.status(500).json({
            message: '发送验证码失败，请稍后再试',
            code: 1
        });
    }
}

//解析验证码
const resolveSMSCode = async (req, res, next) => {
    const {sms, ...params} = req.body
    //短信检测
    let result = await redis.get(`sms_${params.phone}`)
    if (result) {
        if (sms === result) {
            await next()
        } else {
            return res.status(200).json({
                code: 1,
                message: '验证码错误'
            })
        }
    } else {
        return res.status(200).json({
            code: 1,
            message: '验证码已过期'
        })
    }
}

module.exports = {
    sendSMSCode,
    resolveSMSCode
}