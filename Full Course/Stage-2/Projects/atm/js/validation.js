function validateNumber(number) {
	return !isNaN(number);
}

function validateComparison(number, compare, operator) {
	if (operator === ">") {
		return number > compare;
	}
	if (operator === "<") {
		return number < compare;
	}
	if (operator === ">=") {
		return number >= compare;
	}
	if (operator === "<=") {
		return number <= compare;
	}
	if (operator === "==") {
		return number == compare;
	}
	if (operator === "===") {
		return number === compare;
	}
	if (operator === "!=") {
		return number != compare;
	}
	if (operator === "!==") {
		return number !== compare;
	}
	return true;
}
