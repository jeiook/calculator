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
	if (!numchar(e.substring(0,1)) && e.charCodeAt(0) !== 45) {//first char must be a number or negative sign
		return false;
	} else {
		let testchar;
		for (let i = 0; i < e.length; i++) {
			testchar = e.substring(i,i+1);
			if (!numchar(testchar) && !isopchar(testchar)) {
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
	switch(e) {
		case 42: 
			return "times";
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
	//case 1: there is only one op
	let opindex = -1;
	for (let i = 0; i < e.length; i++) {
		if (isopchar(e.substring(i,i+1))) {
			opindex = i;
			break;
		}
	}
	return opindex;
}

export { numchar, isopchar, idop, isvalid, indexofOp };