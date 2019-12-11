import * as Text from './text'

//TODO: make add and multiply cover subtraction and division, respectively

function evaluate(e) {
    console.log("eval arg: " + e);
    if (e === "" || !Text.isvalid(e)) {//base case 1: empty text
        return "";
    }
    if (Text.countops(e) === 0 || Text.idop(e) === "subtract") {//base case 2: no operator (just a number)
        return e;
    }
    //divide into smaller expressions with one operator
    //console.log("number of ops: " + Text.countops(e));
    if (Text.countops(e) === 1) {//base case 3: one operator
        return calculate(e);
    } else {//recursive case: more than one operator
        if (!Text.ismixedop(e)) {//homog ops
            console.log("homog ops");
            let indexop = Text.indexofOp(e);
            let splitindex = indexop + 1 + Text.indexofOp(e.substring(indexop+1));
            return evaluate(String(calculate(e.substring(0,splitindex))).concat(e.substring(splitindex)));
        } else {//there are mixed ops
            console.log("mixed ops");
            //TODO: implement for full PEMDAS

            //find first op: if +/-, evaluate the 2nd oprnd. if *,/, calculate that operation; and then append
            let firstopind = 1 + Text.indexofOp(e.substring(1));
            if (Text.idop(e.substring(firstopind,firstopind+1)) === "multiply" || Text.idop(e.substring(firstopind,firstopind+1)) === "divide") {
                //find the second op
                let secondopind = firstopind + 1 + Text.indexofOp(e.substring(firstopind+1));
                return evaluate(String(calculate(e.substring(0,secondopind))).concat(e.substring(secondopind)));
            } else {//first op found is +/-
                return evaluate(e.substring(0,firstopind+1).concat(String(evaluate(e.substring(firstopind+1)))));
            }
        }
    }
}

function calculate(e) {//to be used only with an expression with one operator
        let opindex = Text.indexofOp(e);
        let operator = Text.idop(e.substring(opindex,opindex+1));
        switch(operator) {
            case "add":
                return add(e,opindex);
            case "subtract":
                return subtract(e,opindex);
            case "multiply":
                return multiply(e,opindex);
            case "divide":
                return divide(e,opindex);
            default:
                return -1;
        }
    }

function add(e,index) {
    return Number(e.substring(0,index)) + Number(e.substring(index+1));
}

function subtract(e,index) {
    return Number(e.substring(0,index)) - Number(e.substring(index+1));
}

function multiply(e,index) {
    return Number(e.substring(0,index)) * Number(e.substring(index+1));
}

function divide(e,index) {
    if (Number(e.substring(index+1)) === 0) {
        return "";
    }
    return Number(e.substring(0,index)) / Number(e.substring(index+1));
}

function driver() {
    return String(Text.ismixedop("3*9+9"));
}

export { calculate, evaluate, driver }