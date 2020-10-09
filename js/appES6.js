class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class Display {
    store(book) {
        console.log(book);
        let books = localStorage.getItem("books");
        let booksObj;
        if (books == null) {
            booksObj = [];
        } else {
            booksObj = JSON.parse(books);
        }
        let myObj = {
            name: book.name,
            author: book.author,
            type: book.type
        }
        booksObj.push(myObj);
        localStorage.setItem("books", JSON.stringify(booksObj));
    }

    show() {
        let books = localStorage.getItem("books");

        let booksObj;
        if (books == null) {
            booksObj = [];
        } else {
            booksObj = JSON.parse(books);
        }
        let html = "";
        booksObj.forEach(function (element, index) {
            html += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td>
                        <button id="${index}" onclick="remove(this.id)" class="btn btn-danger btn-sm">Remove</button>
                        <button id="${index}" onclick="editNote(this.id)" class="btn btn-success btn-sm">Edit</button>
                        </td>
                    </tr>`;
        });
        let booksElm = document.getElementById("tbody");
        if (booksObj.length != 0) {
            booksElm.innerHTML = html;
        } else {
            booksElm.innerHTML = `<p class="text-light">nothing to show</>`;
        }
    }

    validate(book) {
        if (book.name.length > 2) {
            return true;
        }
        else {
            return false;
        }
    }

    clear() {
        myForm.addEventListener('submit', formData);
        myForm.reset();
    }

    userMassege(type, getMassege) {
        let showMassege = ` <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong> Massege </strong> ${getMassege}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </div>`
        let massege = document.getElementById('massege');
        massege.innerHTML += showMassege;

        setTimeout(() => {
            massege.innerHTML = '';
        }, 2000);

    }
    delete(index) {
        let books = localStorage.getItem("books");
        let booksObj;
        if (books == null) {
            booksObj = [];
        } else {
            booksObj = JSON.parse(books);
        }
        booksObj.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(booksObj));
        show();
    }
}
function remove(index) {
    let books = localStorage.getItem("books");
    let booksObj;
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }
    booksObj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksObj));

    display = new Display;
    display.show();
}


let myForm = document.getElementById('myFrom');
myForm.addEventListener('submit', formData);

function formData(e) {
    event.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let novel = document.getElementById('novel');
    let programming = document.getElementById('programming');
    let poem = document.getElementById('poem');

    if (novel.checked) {
        type = novel.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (poem.checked) {
        type = poem.value;
    }

    let book = new Book(name, author, type);

    display = new Display;
    if (display.validate(book)) {
        display.store(book);
        display.show();
        display.clear();
        display.userMassege('success', 'Entry successfull');

    } else {

        display.userMassege('danger', 'Entry decline');

    }
}
display = new Display;
display.show();