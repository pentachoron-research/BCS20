
const transfer = require("./functions/transfer.js");
const approve = require("./functions/approve.js");
const burn = require("./functions/burn.js");
const transferFrom = require("./functions/transferFrom.js");

export function handle(action) {
    let actionsToDo=[]
    if (!action.input || typeof action.input !== "object" || typeof action.input.function !== "string") {
        ContractError("Invalid input or function not provided");
    }

    const functionMap = {
        "transfer": transfer,
        "burn": burn,
        "approve": approve,
        "transferFrom":transferFrom,
    };

    const selectedFunction = functionMap[action.input.function];
    if (!selectedFunction) {
        ContractError(`Function '${action.input.function}' not found`);
    }

    try {
        selectedFunction(action, actionsToDo);
        return {finalizerActions: actionsToDo}
    } catch (error) {
        ContractError(`Error executing function '${action.input.function}': ${error.message}`);
    }
}
