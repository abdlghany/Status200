// TO DO
// Missing check on amount available in ATM

function initialise() {
	// show note quantities
	showNoteQuantities();

	// No more notes left
	if (getNotesTotalQuantity() == 0) {
		loadOutOfService();
	} else {
		loadAuthenticate();
	}
}

function showNoteQuantities() {
	// Show the note quantities
	let output = "Supply ATM: ";
	for (var i = 0; i < atm_note_denominations.length; i++) {
		output += atm_note_quantities[i] + " x $" + atm_note_denominations[i];
		if (i < atm_note_denominations.length - 1) {
			output += " | ";
		}
	}
	getById("note_quantities").innerHTML = output;
}

function loadAuthenticate() {
	// Reset the client index
	clientIndex = -1;

	// Reset the input fields
	getById("account").value = "";
	getById("pincode").value = "";

	// Remove client name
	var customerNameFields = getByClass("customer-name");
	for (var i = 0; i < customerNameFields.length; i++) {
		customerNameFields[i].innerHTML = "";
	}

	// Show the authenticate screen
	loadScreen("authenticate");
}

function loadOutOfService() {
	loadScreen("out-of-service");
}

function loadChooseOperation() {
	loadScreen("choose-operation");
}

function loadDeposit() {
	loadScreen("deposit");
}

function loadWithdraw() {
	if (getNotesTotalQuantity() == 0) {
		loadOutOfService();
	} else {
		getById("can-withdraw").innerHTML = getClientMaxWithdrawToday();
		loadScreen("withdraw");
	}
}

function loadBalance() {
	loadScreen("balance");
	getById("balance-amount").innerHTML = client_balances[clientIndex];
	getById("credit-amount").innerHTML = client_credits[clientIndex];
	getById("withdraw-left").innerHTML = getClientMaxWithdrawToday();
}

function processAuthenticate() {
	var account = getById("account").value;
	var pincode = getById("pincode").value;

	// Check if the account exists
	clientIndex = client_accounts.indexOf(account);

	// If account exists, check if the pincode is correct
	if (clientIndex != -1) {
		if (client_pincodes[clientIndex] == pincode) {
			// Show customer name
			var customerNameFields = getByClass("customer-name");
			for (var i = 0; i < customerNameFields.length; i++) {
				customerNameFields[i].innerHTML = client_names[clientIndex];
			}

			// Load the choose operation screen
			loadChooseOperation();
			return;
		}
	}

	// Authentication failed
	getById("authenticate-error").innerHTML =
		"Authentication failed. Try again.";
}

function processWithdraw() {
	// Reset the error message
	getById("withdraw-error").innerHTML = "";

	// Get the amount to withdraw
	let amount = getById("withdraw-amount").value;

	// Check if the amount not empty
	if (!validateComparison(amount, "", "!=")) {
		getById("withdraw-error").innerHTML =
			"Please enter an amount to withdraw";
		return;
	}

	// check if amount is bigger than 0
	if (!validateComparison(amount, 0, ">")) {
		getById("withdraw-error").innerHTML =
			"The requested amount must be bigger than 0";
		return;
	}

	// check if amount is a integer
	if (!validateComparison(amount, Math.round(amount), "==")) {
		getById("withdraw-error").innerHTML =
			"The requested amount can only be a whole number";
		return;
	}

	// Convert the amount to an integer
	amount = parseInt(amount);

	// check if amount is a number
	if (!validateNumber(amount)) {
		getById("withdraw-error").innerHTML =
			"The requested amount is not a number";
		return;
	}

	// Does the client have enough balance?
	if (!validateComparison(amount, client_balances[clientIndex], "<=")) {
		getById("withdraw-error").innerHTML =
			"The requested amount exceeds your balance (" +
			client_balances[clientIndex] +
			")";
		return;
	}

	// Can customer withdraw this amount?
	var max_withdraw_left_today = getClientMaxWithdrawToday();
	if (!validateComparison(amount, max_withdraw_left_today, "<=")) {
		getById("withdraw-error").innerHTML =
			"Your daily withdraw limit will be exceded with the requested amount.<br>You can still withdraw " +
			max_withdraw_left_today +
			" today.";
		return;
	}

	// Get the notes to output
	var notes = getNotesToOutput(amount);

	// If notes is an empty array, the amount cannot be withdrawn
	if (notes.length == 0) {
		getById("withdraw-error").innerHTML =
			"The requested amount cannot be withdrawn.";
		return;
	}

	// Deduct the amount from the client balance
	updateClientBalance(-amount);

	// Update the client withdraw total today
	updateClientWithdrawToday(amount);

	// Update the note quantities
	for (var i = 0; i < notes.length; i++) {
		updateNoteCount(i, -notes[i]);
	}

	// Reset withdraw amount input field
	getById("withdraw-amount").value = "";

	// Load the withdraw screen
	var output = "<u>Output ATM:</u><br>";
	for (var i = 0; i < notes.length; i++) {
		if (notes[i] != 0) {
			output += notes[i] + " x " + atm_note_denominations[i] + "<br>";
		}
	}
	getById("withdraw-result").innerHTML = output;
	getById("can-withdraw").innerHTML = getClientMaxWithdrawToday();

	// show note quantities
	showNoteQuantities();
}

function processDeposit() {
	// Reset the error message
	getById("deposit-error").innerHTML = "";

	// Define the amount to keep track of the total amount to deposited
	let amount = 0;

	// Loop through the denominations and check the amount of bills
	for (i = 0; i < atm_note_denominations.length; i++) {
		// Get the amount of bills of a certain denomination
		let amountOfBills = getById(
			"deposit-" + atm_note_denominations[i]
		).value;

		if (amountOfBills == "") {
			continue;
		}

		// check if amount is a integer
		if (
			!validateComparison(amountOfBills, Math.round(amountOfBills), "==")
		) {
			getById("deposit-error").innerHTML =
				"The requested amount can only be a whole number";
			return;
		}

		// Convert the amount to an integer
		amountOfBills = parseInt(amountOfBills);

		// check if amount is a number
		if (!validateNumber(amountOfBills)) {
			getById("deposit-error").innerHTML =
				"The requested amount is not a number";
			return;
		}

		// check if amount is bigger or equal than 0
		if (!validateComparison(amountOfBills, 0, ">=")) {
			getById("deposit-error").innerHTML =
				"The requested amount must be bigger than 0";
			return;
		}

		// add value of bills to amount
		amount += amountOfBills * atm_note_denominations[i];

		// Update the note quantities
		atm_note_quantities[i] += amountOfBills;
	}

	// Reset input fields
	for (let i = 0; i < atm_note_denominations.length; i++) {
		getById("deposit-" + atm_note_denominations[i]).value = "";
	}

	// Update balance and show page if deopist mount is bigger than 0
	if (amount > 0) {
		// Update the client balance
		updateClientBalance(amount);

		// Load balance screen
		loadBalance();

		// show note quantities
		showNoteQuantities();
	}
}

/**
 * @param {integer} clientIndex
 * @param {integer} amount (positive)
 */
function updateClientWithdrawToday(amount) {
	if (amount > 0) {
		client_withdraw_total_today[clientIndex] += amount;
	}
}

/**
 * @param {integer} clientIndex
 * @param {integer} amount (positive or negative)
 */
function updateClientBalance(amount) {
	client_balances[clientIndex] += amount;
}

/**
 * @param {integer} noteIndex (0: 100, 1: 50 or 2: 20)
 * @param {integer} quantity (positive or negative)
 */
function updateNoteCount(noteIndex, quantity) {
	atm_note_quantities[noteIndex] += quantity;
}

function getNotesTotalQuantity() {
	var total = 0;
	for (var i = 0; i < atm_note_quantities.length; i++) {
		total += atm_note_quantities[i] * atm_note_denominations[i];
	}
	return total;
}

/**
 * @param {integer} amount
 */
function getNotesToOutput(amount) {
	// array to keep track of the number of notes to output per demonination
	const notes = [];

	// loop through the demoninations and calculate the number of notes to output
	let remainder = 0;
	for (let i = 0; i < atm_note_denominations.length; i++) {
		// Remainder after dividing the amount by the demonination (i)
		remainder = amount % atm_note_denominations[i];

		// Prefered amount of notes of this demonination (i)
		prefered_quantity = (amount - remainder) / atm_note_denominations[i];

		// Do we have this ampount of notes in the ATM?
		if (atm_note_quantities[i] >= prefered_quantity) {
			notes.push(prefered_quantity);
			amount -= prefered_quantity * atm_note_denominations[i];
		}
		// If not, take as many as we can
		else {
			notes.push(atm_note_quantities[i]);
			amount -= atm_note_quantities[i] * atm_note_denominations[i];
		}
	}
	if (amount > 0) {
		return [];
	}
	return notes;
}

/**
 * Determine the maximum amount the client can (still) withdraw today
 *
 * @param {integer} clientIndex
 */
function getClientMaxWithdrawToday() {
	// Max left to withdraw today without taking balance and credit into account
	let left_today =
		max_withdraw_per_day - client_withdraw_total_today[clientIndex];

	if (
		left_today >
		client_balances[clientIndex] + client_credits[clientIndex]
	) {
		left_today = client_balances[clientIndex] + client_credits[clientIndex];
	}

	// Get the modulo of 10 of the amount left today
	var modulo = left_today % 10;

	// Return the maximum amount the client can withdraw today (rounded down to the nearest 10)
	return left_today - modulo;
}

/**
 * @param {array} bills
 * @param {integer} amount
 */
function validateNotesToOutput(bills, amount) {
	// No more bills in ATM
	if (bills.length == 0) {
		return "There are no more bills in the ATM";
	}

	// Check if the bills sum up to the amount
	var sum = 0;
	for (var i = 0; i < bills.length; i++) {
		sum += bills[i];
	}
	if (sum != amount) {
		return "The bills do not sum up to the amount.";
	}

	// No problems
	return "";
}

/**
 * Load the requested screen
 *
 * @param {string} screenName
 */
function loadScreen(screenName) {
	// Hide all screens
	const screens = getByTag("main");
	for (let i = 0; i < screens.length; i++) {
		removeClass(screens[i], "flex-column");
		addClass(screens[i], "hidden");
	}

	// Show the requested screen
	const screen = getById(screenName);
	removeClass(screen, "hidden");
	addClass(screen, "flex-column");

	// Hide or show operations
	const operations = getByClass("operation");
	if (screenName === "authenticate" || screenName === "out-of-service") {
		for (let i = 0; i < operations.length; i++) {
			removeClass(operations[i], "block");
			addClass(operations[i], "hidden");
		}
	} else {
		for (let i = 0; i < operations.length; i++) {
			removeClass(operations[i], "hidden");
			addClass(operations[i], "block");
		}
	}
}
