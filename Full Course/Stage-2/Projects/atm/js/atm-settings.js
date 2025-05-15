// Max withdraw per day per client
const max_withdraw_per_day = 2500;

// ATM note denominations
const atm_note_denominations = [
	100, // 100 bill
	50, // 50 bill
	20, // 20 bill
	10, // 10 bill
];

// ATM note quantities
const atm_note_quantities = [
	20, // 100 bills
	20, // 50 bills
	20, // 20 bills
	20, // 10 bills
];

// CLient data
const client_names = ["Karel van Zijl", "Ferry Kemperman"];
const client_accounts = ["4321", "1234"];
const client_pincodes = ["1234", "4321"];
const client_balances = [2000, 3000];
const client_credits = [500, 100];
const client_withdraw_total_today = [0, 0];

// Flag to indicate if a client is logged in or not
let clientIndex = -1;
