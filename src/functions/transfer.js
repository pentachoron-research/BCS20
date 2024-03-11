const Big = require('big.js');
module.exports = function ({ input, caller }, changes) {
    ContractAssert(typeof input.amount == "string" && !isNaN(amount), "Invalid amount provided")
    ContractAssert(typeof input.to == "string", "No \"to\" specified");

    const to = input.to;
    const amount = Big(input.amount);
    ContractAssert(amount.c == "0", "Cannot transfer fraction of minimal unit")
    
    const senderBalance = Big(KV.get(`balances.${caller}`) || "0")
    const receiverBalance = Big(KV.get(`balances.${to}`) || "0")

    ContractAssert(senderBalance.gte(amount), "Not enough tokens to transfer this amount")
    changes.push(
        KV.set(`balances.${caller}`, senderBalance.minus(amount).toString()),
        KV.set(`balances.${to}`, receiverBalance.plus(amount).toString())
    )
};
