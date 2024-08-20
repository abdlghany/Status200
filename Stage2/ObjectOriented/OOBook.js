import rl from "readline";

class Book {
    constructor(title, author, ISBN, publicationDate, pages) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.publicationDate = new Date(publicationDate);
        this.pages = pages;
        this.currentPage = 0;
        this.isFinished = false;
    }

    read(pagesRead) {
        if (this.isFinished) {
            console.error('You\'ve already finished reading "' + this.title + '".');
            return;
        }
        this.currentPage += pagesRead;
        if (this.currentPage >= this.pages) {
            this.currentPage = this.pages;
            this.isFinished = true;
            console.log('You\'ve finished reading "' + this.title + '".');
        } else {
            console.log('You\'ve read ' + pagesRead + ' pages. You\'re now on page ' + this.currentPage + ' of "' + this.title + '".');
        }
    }

    bookmark(page) {
        if (page > 0 && page <= this.pages) {
            this.currentPage = page;
            console.log('You\'ve successfully bookmarked page ' + this.currentPage + ' in "' + this.title + '".');
            return true;
        } else {
            console.error('Invalid page number. "' + this.title + '" only has ' + this.pages + ' pages.');
            return false;
        }
    }

    getBookInfo() {
        return this.title + " by " + this.author + ", ISBN: " + this.ISBN + ", Published on: " + this.publicationDate.toDateString() + ", Pages: " + this.pages;
    }
}

class FictionBook extends Book {
    constructor(title, author, ISBN, publicationDate, pages, genre) {
        super(title, author, ISBN, publicationDate, pages);
        this.genre = genre;
        this.characters = [];
    }

    addCharacter(character) {
        this.characters.push(character);
        console.log(character + " has been added to the story of \"" + this.title + "\".");
    }
    // join adds all elements of an array "this.characters" to a string, seperated by whatever parameter is passed.
    getBookInfo() {
        return super.getBookInfo() + ", Genre: " + this.genre + ", Characters: " + this.characters.join(', ');
    }

}

class NonFictionBook extends Book {
    constructor(title, author, ISBN, publicationDate, pages, subject) {
        super(title, author, ISBN, publicationDate, pages);
        this.subject = subject;
        this.isCited = false;
    }

    getBookInfo() {
        return super.getBookInfo() + ", Subject: " + this.subject;
    }

    review() {
        if (this.isFinished) {
            console.log('Now that you\'ve finished "' + this.title + '", let\'s review points that are related to ' + this.subject + '.');
        } else {
            console.error('You can\'t review "' + this.title + '" before you finish reading it.');
        }
    }
}
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

// (books information are auto generated becuase I do not know the details of many books and didn't want to waste much time researching it.)
const fictionBooks = [
    new FictionBook('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', '1925-04-10', 180, 'Novel'),
    new FictionBook('1984', 'George Orwell', '9780451524935', '1949-06-08', 328, 'Dystopian')
];
const nonFictionBooks = [
    new NonFictionBook('Sapiens', 'Yuval Noah Harari', '9780062316097', '2014-09-04', 443, 'History'),
    new NonFictionBook('Educated', 'Tara Westover', '9780399590504', '2018-02-20', 352, 'Memoir')
];

function start() {
    readline.question("What would you like to do?\n1. View Fiction Books\n2. View Non-Fiction Books\n3. Read a Book\n4. Add a Character (Fiction)\n5. Bookmark a book (Non-Fiction)\nx. Quit\nYour selection: ", function(input) {
        input = input.trim().toLowerCase();
        console.clear();
        if (input == '1') {
            fictionBooks.forEach(function (book) {
                console.warn(book.getBookInfo())
            });
            start();
        } else if (input == '2') {
            nonFictionBooks.forEach( function(book) {
                console.warn(book.getBookInfo())
            });
            start();
        } else if (input == '3') {
            selectBook(allAvailableBooks());
        } else if (input == '4') {
           addCharacter();
        } else if (input == '5') {
           bookMarkNonFiction();
        } else if (input == 'x') {
            console.log("See you soon!");
            readline.close();
        } else {
            console.error("Please select a valid option.");
            start();
        }
    });
}

function selectBook(books) {
    console.clear();
    console.log('Available Books:');
    books.forEach(function (book, index){
        console.log((index+1) + '. ' + book.title + ' by ' + book.author);
    });
    readline.question('Enter the number of the book you want to read: ', function(bookChoice) {
        bookChoice = parseInt(bookChoice) - 1;
        
        if (bookChoice >= 0 && bookChoice < books.length) {
            const book = books[bookChoice];
            console.log('You selected: ' + book.title + ' by ' + book.author);
            book.read(book.pages);
            start();
        } else {
            console.error('Invalid book selection.');
            selectBook(books);
        }
    });
}

function allAvailableBooks(){
    var books = [];
    for(let i = 0; i< fictionBooks.length; i++){
        books.push(fictionBooks[i]);
    }
    for(let i = 0; i< nonFictionBooks.length; i++){
        books.push(nonFictionBooks[i]);
    }
    return books
}

function bookMarkNonFiction(){
    console.clear();
    var message = "";
    var nonFictionBooksIndexes = [];
    nonFictionBooks.forEach(function (value, index){
        message += parseInt(index+1) +". "+ value.title+" Number of pages: "+value.pages+"\n";
        nonFictionBooksIndexes.push(parseInt(index));
    });
    readline.question("Select one of the available books by its number:\n"+message+"Your selection: ", function(input) {
        input-=1;
        if (nonFictionBooksIndexes.includes(input)) {
           boookMarkNonFictionPageNumber(input);
        } else {
            console.clear();
            console.error("Non-fiction book not found.");
            bookMarkNonFiction();
        }
    });
}

function boookMarkNonFictionPageNumber(bookIndex){
    console.clear();
    readline.question("Enter the page number to bookmark it: ", function(pageNumber) {
        if(pageNumber <= nonFictionBooks[bookIndex].pages)
    if(nonFictionBooks[bookIndex].bookmark(pageNumber)){
        start();
    }else{
        console.error("An error happened please try again later.");
        start();
    }
});
}

function addCharacter(){
    console.clear();
    var message = "";
    var fictionBooksIndexes = [];
    fictionBooks.forEach(function (value, index){
        message += parseInt(index+1) +". "+ value.title+" Number of pages: "+value.pages+"\n";
        fictionBooksIndexes.push(parseInt(index));
    });
    readline.question("Select one of the available books by its number:\n"+message+"Your selection: ", function(index) {
        index-=1;
        if (fictionBooksIndexes.includes(index)) {
            readline.question("Enter the character's name: ", function(character) {
                //Skipped validation cause it's 11:20PM.
                fictionBooks[index].addCharacter(character);
                start();
            });
        } else {
            console.clear();
            console.error("Fiction book not found.");
            start();
        }
    });
}

start();