class Cat {
    #isAlive;
    
    constructor(name, gender, breed, color, dateOfBirth) {
        this.name = name;
        this.gender = gender;
        this.breed = breed;
        this.color = color;
        this.dateOfBirth = dateOfBirth;
        this.dateofDeath = "";
        this.#isAlive = true;
        this.isAsleep = false;
        this.isEating = false;
        this.isAngry = false;
    }

    meow() {
        if (!this.#isAlive) {
            console.error(this.name + " is dead :( can't meow.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't meow.");
        } else if (this.isAngry) {
            console.warn(this.name + " is meowing angrily, do be careful!");
        } else {
            console.warn(this.name + " is meowing.");
        }
    }

    bite() {
        if (!this.#isAlive) {
            console.error(this.name + " is dead :( can't bite.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't bite.");
        } else if (this.isAngry) {
            console.warn(this.name + " is biting angrily, it bites your finger off....ouch");
            this.isAngry = false;
        } else {
            console.warn(this.name + " is biting.");
        }
    }

    eat() {
        if (!this.#isAlive) {
            console.error(this.name + " is dead :( can't eat.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't eat.");
        } else if (this.isAngry) {
            console.warn(this.name + " is too angry to eat.");
        } else {
            console.warn(this.name + " is eating.");
            this.isEating = true;
        }
    }

    sleep() {
        if (!this.#isAlive) {
            console.error(this.name + " is dead :( can't sleep.");
        } else if (this.isAsleep) {
            console.error(this.name + " is already sleeping.");
        } else if (this.isAngry) {
            console.warn(this.name + " is too angry to sleep, but tries to anyway...you got lucky this time buddy.");
            this.isAsleep = true;
            this.isAngry = false;
            this.isEating = false;
        } else {
            console.warn(this.name + " is sleeping.");
            this.isAsleep = true;
            this.isEating = false;
        }
    }

    wakeUp() {
        if (this.#isAlive) {
            if (this.isAsleep) {
                this.isAsleep = false;
                console.warn(this.name + " is now awake!");
            } else {
                console.error(this.name + " is already awake, can't be more awake.");
            }
        }else{
            console.error(this.name + "is dead :( can't wake up from that...");
        }
    }

    die(DateOfDeath) {
        if (this.#isAlive) {
            this.#isAlive = false;
            this.dateofDeath = DateOfDeath;
            const ageInMilliseconds = Math.abs(this.dateofDeath - this.dateOfBirth);
            const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
            if(ageInSeconds > 60){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60) + " minute(s)");
            }else if(ageInSeconds > 3600){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60/60) + " hour(s)");
            }
            else if(ageInSeconds > 86400){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60/60/24) + " day(s)");
            }
            else if(ageInSeconds > 2592000){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60/60/24/30) + " month(s)");
            }
            else if(ageInSeconds > 31104000){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60/60/24/30/12) + " year(s)");
            }else if(ageInSeconds < 60){
                console.warn(this.name + " has died :( at the age of: " + ageInSeconds + " second(s)");
            }
            else {
                console.warn(this.name + " has died :( at the age of: 0 second(s)");
            }
        } else {
            if(ageInSeconds > 60){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60) + " minute(s)");
            }else if(ageInSeconds > 3600){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60/60) + " hour(s)");
            }
            else if(ageInSeconds > 86400){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60/60/24) + " day(s)");
            }
            else if(ageInSeconds > 2592000){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60/60/24/30) + " month(s)");
            }
            else if(ageInSeconds > 31104000){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60/60/24/30/12) + " year(s)");
            }else if(ageInSeconds < 60){
                console.warn(this.name + " has already died :( at the age of: " + ageInSeconds + " second(s)");
            }
            else {
                console.warn(this.name + " has already died :( at the age of: 0 second(s)");
            }
        }
    }

    get isAlive(){
        return this.#isAlive;
    }

    set isAlive(status){
        this.#isAlive = status;
    }

    play() {
        if (!this.#isAlive) {
            console.error(this.name + " is dead :( can't play.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't play.");
        } else if (this.isAngry) {
            console.warn(this.name + " is too angry to play and might scratch you!");
        } else {
            console.warn(this.name + " is playing with you...");
        }
    }

    purr() {
        if (!this.#isAlive) {
            console.error(this.name + " is dead :( can't purr.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't purr.");
        } else if (this.isAngry) {
            console.warn(this.name + " is too angry to purr.");
        } else {
            console.warn(this.name + " is purring.");
        }
    }

    hurt() {
        if (!this.#isAlive) {
            console.error(this.name + " is dead :( can't get hurt anymore.");
        } else if (this.isAngry) {
            console.warn("OH YOU'VE DONE IT NOW...." + this.name.toUpperCase() + " IS EVEN ANGRIER! RUN!");
        } else {
            this.isAngry = true;
            this.isAsleep = false;
            this.isEating = false;
            console.warn(this.name + " is now angry.");
        }
    }
}

export default Cat;