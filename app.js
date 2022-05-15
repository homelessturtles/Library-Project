const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const librarycontainer = document.querySelector(".librarycontainer");
const formcontainer = document.querySelector(".hide");
const form = document.querySelector(".addbook");
const open = document.querySelector(".addbutton");
const close = document.querySelector(".x");

class Library{
  constructor(){
    this.library = []
  }

  get mylibrary(){
    return library
  }

  addBook(title, author, pages, hasRead){
    const book = new Book(title, author, pages, hasRead)
    this.library.push(book)
  }

  deleteBook(booktofind) {
    console.log(booktofind);
    const index = this.library.findIndex((book) => book.title == booktofind);
    //console.log(`the index of ${booktofind} is ${index}`)
    this.library.splice(index, 1);
    console.log(this.library);
    this.clearDOM();
    this.displayBooks();
  }

  readBook(booktofind) {
    console.log(booktofind);
    const index = this.library.findIndex((book) => book.title == booktofind);
    if (this.library[index].hasRead === true) {
      this.library[index].hasRead = false;
      console.log(this.library[index]);
    } else {
      this.library[index].hasRead = true;
      console.log(this.library[index]);
    }
  }

  clearDOM() {
    let library = librarycontainer;
    while (library.firstChild) {
      library.removeChild(library.firstChild);
    }
  }

  displayBooks() {
    this.library.forEach((book) => {
      //create elements
      const container = document.createElement("div");
      container.classList.add("book");
      const title = document.createElement("p");
      title.classList.add("title");
      const author = document.createElement("p");
      author.classList.add("author");
      const pages = document.createElement("p");
      pages.classList.add("pages");
      const deletebtn = document.createElement("button");
      deletebtn.innerText = "Remove";
      deletebtn.classList.add("deleted");
      deletebtn.addEventListener("click", () => {
        this.deleteBook(title.innerText);
      });
      const readbtn = document.createElement("button");
      readbtn.innerText = "I've read this";
      readbtn.classList.add("read");
      readbtn.addEventListener("click", () => {
        this.readBook(title.innerText);
      });
  
      //place elements correctly in dom
      librarycontainer.appendChild(container);
      container.appendChild(title);
      container.appendChild(author);
      container.appendChild(pages);
      container.appendChild(deletebtn);
      container.appendChild(readbtn);
  
      //add form values into the new dom elements
      title.innerText = book.title;
      author.innerText = book.author;
      pages.innerText = book.pages;
    });
  }
}

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }
}

const library = new Library()

form.addEventListener("submit", (e) => {
  e.preventDefault();
  library.addBook(title.value, author.value, pages.value, false);
  console.log(library.mylibrary);

  library.clearDOM();
  library.displayBooks();

  title.value = "";
  author.value = "";
  pages.value = "";
});

open.addEventListener("click", () => {
  formcontainer.classList.remove("hide");
  formcontainer.classList.add("visible");
});

close.addEventListener("click", () => {
  formcontainer.classList.remove("visible");
  formcontainer.classList.add("hide");
});
