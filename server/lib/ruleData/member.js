const CREATE = [
    {
        kay: 'nickname',
        rule: {
            type: 'string',
            required: true,
        }
    },
    {
        kay: 'wechat',
        rule: {
            type: 'string',
            required: true,
        }
    },
    {
        kay: 'phone',
        rule: {
            type: 'number',
            required: true,
        }
    },
    {
        kay: 'sms',
        rule: {
            type: 'string',
            required: true,
        }
    }
]

module.exports = [
    CREATE
]