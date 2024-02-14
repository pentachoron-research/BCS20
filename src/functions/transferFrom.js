const Big = require('big.js');
module.exports = function ({ input, caller }, changes) {
    ContractAssert(typeof input.amount == "string" && !isNaN(amount), "Invalid amount provided")
    ContractAssert(typeof input.from == "string", "No \"from\" specified.");
    ContractAssert(typeof input.to == "string", "No \"to\" specified.");

    const to = input.to;
    const from = input.from;
    const allowance = Big(KV.get(`allowances.${from}.${caller}`)||"0")
    const amount = Big(input.amount);
    
    ContractAssert(amount.c == "0", "Cannot approve spending fraction of minimal unit")
    ContractAssert(allowance.gte(amount), "Trying spending more than allowed")
   
    const senderBalance = Big(KV.get(`balances.${from}`) || "0")
    const receiverBalance = Big(KV.get(`balances.${to}`) || "0")

    ContractAssert(senderBalance.gte(amount), "Not enough tokens to transfer this amount")

    changes.push(
        KV.set(`allowances.${from}.${caller}`, allowance.minus(amount).toString()),
        KV.set(`balances.${from}`, senderBalance.minus(amount).toString()),
        KV.set(`balances.${to}`, receiverBalance.plus(amount).toString())

    )
};
