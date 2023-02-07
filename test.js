const Binance = require('binance-api-node').default

const client = Binance({
    apiKey: 'w2fmRdBVpZROxMkS96PlBgqzDv7mAJ4Of4zz8oWpOeNddcYA5dYVfmaNc2SOkRq2',
    apiSecret: 'mSw2jrKwRggwJWHFeVLLENnkLnkZX2s6OpAHYIoFLktetgegQUkj0AuW5CO9b14J',
  })

client.accountInfo().then((val) => {
    console.log(val)
})