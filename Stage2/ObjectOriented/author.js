class author{
    constructor(name, nationality){
        this.name = name;
        this.nationality = nationality;
    }
    getDetails(){
        return this.name + " " +this.nationality;
    }
}

export default author;