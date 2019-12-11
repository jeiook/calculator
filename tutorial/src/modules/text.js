function numchar(e) {
	let charcode = e.charCodeAt(0);
	if (!(charcode > 47 && charcode < 58)) { //numbers 1-9
      return false;
    }
    return true;
}

function isopchar(e) {
	let charcode = e.charCodeAt(0);
	if (charcode === 42 || charcode === 43 || charcode === 45 || charcode === 47) {// *:42, +:43, -:45, /:47
		return true;
	}
	return false;
}

function isvalid(e) {
	//TODO: account for the case when there are consecutive opeartions with no operands in between (e.g. 5++6)
	if (!numchar(e.substring(0,1)) && e.charCodeAt(0) !== 45 && e.charCodeAt(0) !== 46) {//first char must be a number or negative sign or dot
		return false;
	} else {
		let testchar;
		for (let i = 0; i < e.length; i++) {
			testchar = e.substring(i,i+1);
			if (!numchar(testchar) && !isopchar(testchar) && testchar.charCodeAt(0) !== 46) {
				return false;
			}
		}
		//at this point, all chars are numbers or ops
		if (!numchar(e.substring(e.length-1,e.length))) {//last char can only be a number
			return false;
		}
	}
	return true; //this means the entire string is a combination of ops and numbers (with only numbers at the end)
}

function idop(e) {
	switch(e.charCodeAt(0)) {
		case 42: 
			return "multiply";
		case 43: 
			return "add";
		case 45: 
			return "subtract";
		case 47: 
			return "divide";
		default: 
			return "error";
	}
}

function indexofOp(e) {
	let opindex = -1;
	for (let i = 0; i < e.length; i++) {
		if (idop(e.substring(i,i+1)) !== "error") {
			opindex = i;
			break;
		}
	}
	return opindex;
}

function indexofplusminus(e) {//e must have one or more ops
	let index = indexofOp(e);
	while (index !== -1 && index < e.length) {
		if (idop(e.substring(index,index+1)) === "add" || idop(e.substring(index,index+1)) === "subtract") {
			return index;
		}
		if (indexofOp(e.substring(index+1)) !== -1) {
			index += indexofOp(e.substring(index+1)) + 1;
		} else {
			break;
		}
	}
	return -1; //there are only multiplications and divisions
}

function indexofmultdiv(e) {//e must have one or more ops
	let index = indexofOp(e);
	while (index !== -1 && index < e.length) {
		if (idop(e.substring(index,index+1)) === "multiply" || idop(e.substring(index,index+1)) === "divide") {
			return index;
		}
		if (indexofOp(e.substring(index+1)) !== -1) {
			index += indexofOp(e.substring(index+1)) + 1;
		} else {
			break;
		}
	}
	return -1; //there are only adds and subtracts
}

function countops(e) {
    let counter = 0;
    for (let i = 0; i < e.length; i++) {
        if (idop(e.substring(i,i+1)) !== "error") {
            counter++;
        }
    }
    return counter;
}

function ismixedop(e) {//only use when e has multiple ops
	//TODO implement exponentials
	if (indexofplusminus(e) === -1 || indexofmultdiv(e) === -1) {
		return false;
	}
	return true;
}

export { numchar, isopchar, idop, isvalid, indexofOp, indexofplusminus, indexofmultdiv, countops, ismixedop };