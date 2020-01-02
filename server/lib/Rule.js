//规则
// let ruleData = [
//     {
//         kay: 'name',
//         rule: {
//             type: 'string',
//             required: true,
//         }
//     },
//     {
//         kay: 'age',
//         rule: {
//             type: 'number',
//             required: true,
//         }
//
//     },
//     {
//         kay: 'sex',
//         rule: {
//             type: 'string',
//             required: true,
//         }
//
//     }
// ]

const rule = (params, rules) => {
    //第一个参数 校验对象
    //第二个参数 是否必填

    //设置监听者
    let sw = true
    //设置传达者
    let swMessge = ''
    //确认必填项
    let requiredArr = []
    rules.forEach(item => {
        //必填
        if (item.rule.required) {
            requiredArr.push(item.kay)
        }
    })
    //校验传入值是否存在这个参数
    //确认获取项
    let objArr = []
    for (let item in params) {
        objArr.push(item)
    }
    //进行必穿项校验
    for (let item of requiredArr) {
        if (objArr.indexOf(item) === -1) {
            console.log('缺少必填项' + item)
            swMessge = `缺少必填项 ${item}`
            sw = false
            break
        }
    }
    //校验数值类型
    rules.forEach(item => {
        for (let i in params) {
            if (i === item.kay) {
                if (!typeof params[i] === item.rule.type) {
                    console.log(i + '类型错误')
                    swMessge = `类型错误 ${i}`
                    sw = false
                    break
                }
            }
        }
    })
    return {
        sw,
        swMessge
    }
}

module.exports = {
    rule
}