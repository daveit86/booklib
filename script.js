// Disabling submit button default function
const submitBtn=document.forms.bookform.submitbtn;
submitBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log("submit disabled!");
})

//Constructor
function Book(title, author, pages, read)
{
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

Book.prototype.toTD = function(elem){
    let td=document.createElement("td");
    td.innerText=elem;
    return td;
}

Book.prototype.toTableRow = function(){
    const row = document.createElement("tr");
        row.appendChild(this.toTD(this.title))
        row.appendChild(this.toTD(this.author))
        row.appendChild(this.toTD(this.pages))
        row.appendChild(this.toTD(this.read?"Read":"Not Read"))
        row.appendChild(this.toTD(""))
    return row;
}

Books=[];


//functions

function addBookToLibrary(title, author, pages, read){
    Books.push(new Book(title, author, pages, read));
}

function updateLibrary()
{
    const tBody = document.querySelector("#library tbody");
    tBody.innerHTML="";
    Books.forEach(element => {
        tBody.appendChild(element.toTableRow());
    });
}

// Predefined books
Books.push(new Book("Paraboleiperboli", "Giobbe Covatta", 256, true));
Books.push(new Book("I Robot", "Asimov", 441, false));
Books.push(new Book("1984", "George Orwell", 526, true));
Books.push(new Book("Cosí é la vita", "Giacomo Poretti", 122, true));

// Initialization
updateLibrary();