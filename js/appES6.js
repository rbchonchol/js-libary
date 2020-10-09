class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class Display {
    add(book) {
        let bookString = `
                        <tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`
        let tbody = document.getElementById('tbody');
        tbody.innerHTML += bookString
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

    show(type, getMassege) {
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
}


let myForm = document.getElementById('myFrom');
myForm.addEventListener('submit', formData);

function formData(e) {
    event.preventDefault();
    let name          =   document.getElementById('bookName').value;
    let author        =   document.getElementById('author').value;
    let type;

    let novel         =   document.getElementById('novel');
    let programming   =   document.getElementById('programming');
    let poem          =   document.getElementById('poem');

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
    display  = new Display;

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success','Entry successfull');

    }else{

        display.show('danger','Entry decline');

    }
}