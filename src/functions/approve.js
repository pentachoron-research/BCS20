const Big = require('big.js');
module.exports = function ({ input, caller }, changes) {
    ContractAssert(typeof input.amount == "string" && !isNaN(amount), "Invalid amount provided")
    ContractAssert(typeof input.spender == "string", "No \"spender\" specified");

    const spender= input.spender;
    const amount = Big(input.amount);
    ContractAssert(amount.c == "0", "Cannot approve spending fraction of minimal unit")
    changes.push(
        KV.set(`allowances.${caller}.${spender}`,amount.toString() ),
    )
};
