const Big = require('big.js');
module.exports = function ({ input, caller }, changes) {

    const to = input.to;
    const amount = Big(input.amount);
    
    const senderBalance = Big(KV.get(`balances.${caller}`) || "0")
    const receiverBalance = Big(KV.get(`balances.${to}`) || "0")

    ContractAssert(senderBalance.gte(amount), "Not enough tokens to transfer this amount")
    changes.push(
        KV.set(`balances.${caller}`, senderBalance.minus(amount).toString()),
        KV.set(`balances.${to}`, receiverBalance.plus(amount).toString())
    )
};
