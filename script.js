const library = [];
const addBookBtn = document.querySelector(".addBook");
const fieldInput = document.querySelectorAll(".popUp__input");
const removeBook = document.getElementById("removeBook");
const popUpCancel = document.querySelector(".popUp__cancel");
const popUpOk = document.querySelector(".popUp__ok");
const idGenerator = getIdGenerator();

function Book(title, author, published, pages, id, read) {
  (this.title = title),
    (this.author = author),
    (this.published = published),
    (this.pages = pages),
    (this.id = id),
    (this.read = Boolean(read));
}

function addBookToLibrary(title, author, published, pages, id, read) {
  const newBook = new Book(title, author, published, pages, id, read);
  library.push(newBook);
  displayBooks();
}
function getBook() {
  const title = document.getElementById("bookName").value;
  const author = document.getElementById("bookAuthor").value;
  const published = document.getElementById("bookDate").value;
  const pages = document.getElementById("bookPages").value;
  const read = document.getElementById("BookRead").checked;
  const id = idGenerator();

  addBookToLibrary(title, author, published, pages, id, read);
}

function getIdGenerator() {
  let value = 0;

  return function () {
    return ++value;
  };
}

function showPopUp() {
  const popUp = document.querySelector(".popUpContainer");
  const body = document.querySelector("body");
  body.classList.add("hideOverflow");
  popUp.style.display = "block";
}

function hidePopUp() {
  const popUp = document.querySelector(".popUpContainer");
  const body = document.querySelector("body");
  body.classList.remove("hideOverflow");
  popUp.style.display = "none";
}

function bookIsRead(elementId, target) {
  const book = library.find((book) => book.id == elementId);
  if (book) {
    if (book.read === true) {
      target.classList.add("read");
      target.classList.remove("notRead");
    } else {
      target.classList.add("notRead");
      target.classList.remove("read");
    }
    book.read = !book.read;
  }
}

function checkIfBookExists(id) {
  const bookCards = document.getElementsByClassName("book");
  for (const card of bookCards) {
    if (card.id === String(id)) {
      return true;
    }
  }
  return false;
}

function displayBooks() {
  library.forEach((book) => {
    if (book && !checkIfBookExists(book.id)) {
      const bookCard = document.createElement("div");
      bookCard.id = book.id;
      bookCard.classList.add("book");
      const bookInfo = document.createElement("div");
      bookInfo.classList.add("bookInfo");
      const bookTitle = document.createElement("h3");
      bookTitle.classList.add("bookTitle__h3");
      const Author = document.createElement("p");
      Author.classList.add("author__p");
      const published = document.createElement("p");
      published.classList.add("author__p");
      const buttons = document.createElement("div");
      buttons.classList.add("book__buttons");
      const btn1 = document.createElement("div");
      btn1.classList.add("book__button", "btn_one");
      const btn2 = document.createElement("div");
      btn2.classList.add("book__button", "btn_two");
      const btn3 = document.createElement("div");
      btn3.classList.add("book__button", "btn_three");
      bookTitle.textContent = book.title;
      Author.textContent = `By ${book.author}`;
      published.textContent = `On ${book.published}`;
      btn1.textContent = book.pages;
      if (book.read === true) {
        btn2.classList.add("read");
        btn2.classList.remove("notRead");
      } else {
        btn2.classList.add("notRead");
        btn2.classList.remove("read");
      }
      if (addBookBtn.nextSibling) {
        addBookBtn.parentNode.insertBefore(bookCard, addBookBtn.nextSibling);
      } else {
        addBookBtn.parentNode.appendChild(bookCard);
      }
      btn2.addEventListener("click", (ev) => {
        bookIsRead(ev.target.parentNode.parentNode.id, ev.target);
      });
      btn3.addEventListener("click", (ev) => {
        deleteBook(ev.target.parentNode.parentNode.id, ev.target);
      });

      bookCard.appendChild(bookInfo);
      bookCard.appendChild(buttons);
      bookInfo.appendChild(bookTitle);
      bookInfo.appendChild(Author);
      bookInfo.appendChild(published);
      buttons.appendChild(btn1);
      buttons.appendChild(btn2);
      buttons.appendChild(btn3);
    }
  });
}

function deleteBook(elementId, element) {
  parent = element.parentNode.parentNode;
  const index = library.findIndex((book) => book.id == elementId);
  library.splice(index, 1);
  while (parent.lastChild) {
    parent.lastChild.remove();
  }
  parent.remove();
}

addBookBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  showPopUp();
});

popUpCancel.addEventListener("click", (ev) => {
  ev.preventDefault();
  hidePopUp();
});

popUpOk.addEventListener("click", (ev) => {
  ev.preventDefault();
  getBook();
  hidePopUp();
});

window.addEventListener("onload", displayBooks());
