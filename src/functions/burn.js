const Big = require('big.js');
module.exports = function ({ input, caller }, changes) {
    ContractAssert(typeof input.amount == "string" && !isNaN(amount), "Invalid amount provided")
    const amount = Big(input.amount);
    
    ContractAssert(amount.c == "0", "Cannot burn fraction of minimal unit")
    
    const burnerBalance = Big(KV.get(`balances.${caller}`) || "0")
    const totalSupply=Big(KV.get("totalSupply"))
    ContractAssert(burnerBalance.gte(amount), "Not enough tokens to burn this amount")
    changes.push(
        KV.set(`balances.${caller}`, burnerBalance.minus(amount).toString()),
        KV.set(`totalSupply`, totalSupply.minus(amount).toString())
    )
};
