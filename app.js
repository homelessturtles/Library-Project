let myLibrary = [];
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const librarycontainer = document.querySelector(".librarycontainer");
const formcontainer = document.querySelector(".hide");
const form = document.querySelector(".addbook");
const open = document.querySelector(".addbutton");
const close = document.querySelector(".x");

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
  const book = new Book(title, author, pages, hasRead);
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
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
      deleteBook(title.innerText);
    });
    const readbtn = document.createElement("button");
    readbtn.innerText = "I've read this";
    readbtn.classList.add("read");
    readbtn.addEventListener("click", () => {
      readBook(title.innerText);
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

function deleteBook(booktofind) {
  console.log(booktofind);
  const index = myLibrary.findIndex((book) => book.title == booktofind);
  //console.log(`the index of ${booktofind} is ${index}`)
  myLibrary.splice(index, 1);
  console.log(myLibrary);
  clearDOM();
  displayBooks();
}

function readBook(booktofind) {
  console.log(booktofind);
  const index = myLibrary.findIndex((book) => book.title == booktofind);
  if (myLibrary[index].hasRead === true) {
    myLibrary[index].hasRead = false;
    console.log(myLibrary[index]);
  } else {
    myLibrary[index].hasRead = true;
    console.log(myLibrary[index]);
  }
}

function clearDOM() {
  let library = librarycontainer;
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, false);
  console.log(myLibrary);

  clearDOM();
  displayBooks();

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
