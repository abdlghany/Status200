class AccountHolder {
    #balance;
    #identityCardNo;
    #pinCode;
    #authorized = [];
    #isWealthy;

    constructor(name, gender, accountNo, currency, balance) {
        this.name = name;
        this.gender = gender;
        this.accountNo = accountNo;
        this.currency = currency;
        this.#balance = balance;
        this.#identityCardNo = "1859635205252";
        this.#pinCode = "951753";
        this.#authorized = ["Ferry", "Karel"];
        this.isActive = true;
        this.genderMessage = "";

        if (this.gender == "M") {
            this.genderMessage = "Mr. ";
        } else {
            this.genderMessage = "Mrs. ";
        }

        this.#isWealthy = this.getWealthyStatus();
    }

    getWealthyStatus() {
        return this.#balance > 1000000;
    }

    get balance() {
        return this.currency + this.#balance;
    }

    get identityCardNo() {
        return this.#identityCardNo;
    }

    get pinCode() {
        return this.#pinCode;
    }

    set pinCode(pincode) {
        this.#pinCode = pincode;
        console.warn("Success!\nYour new pin code is: " + this.#pinCode);
    }

    showAccount() {
        return (
            "Name: " +
            this.genderMessage +
            this.name +
            "\nAccount No.: " +
            this.accountNo +
            "\nCurrency: " +
            this.currency
        );
    }

    showPrivateAccount(personAccessing) {
        if (this.#authorized.includes(personAccessing)) {
            return (
                "Name: " +
                this.genderMessage +
                this.name +
                "\nGender: " +
                this.gender +
                "\nAccount No.: " +
                this.accountNo +
                "\nCurrency: " +
                this.currency +
                "\nBalance: " +
                this.#balance +
                "\nIdentity Card No: " +
                this.#identityCardNo +
                "\nPIN Code: " +
                this.#pinCode
            );
        } else {
            return "Access denied: You do not have access to view private account information.";
        }
    }
}

export default AccountHolder;
