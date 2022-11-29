// Disabling submit button default function
const submitBtn=document.forms.bookform.submitbtn;
submitBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log("submit disabled!");
    addBookToLibrary();
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

Book.prototype.createDeleteBtn = function(){
    const td = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.addEventListener("click",()=>{
        console.log(`Deleting ${this.title}`);
        Books = Books.filter(obj => {
            return obj.title!==this.title;
        })
        updateLibrary();
    })
    td.appendChild(btn);
    return td;
}

Book.prototype.toTableRow = function(){
    const row = document.createElement("tr");
        row.dataset.title = this.title;
        row.appendChild(this.toTD(this.title));
        row.appendChild(this.toTD(this.author));
        row.appendChild(this.toTD(this.pages));
        row.appendChild(this.toTD(this.read?"Read":"Not Read"));
        row.appendChild(this.createDeleteBtn());
    return row;
}

Books=[];


//functions

function addBookToLibrary(){
    const myform = document.forms.bookform;
    console.log(`Adding ${myform.title.value} by ${myform.author.value}, ${myform.pages.value} pages, read:${myform.read.value}`);
    if(myform.title.value!="" && myform.author.value!="" && myform.pages.value!="" && myform.read.value!="")
    {
        console.log(`found ${Books.filter(obj=>obj.title===myform.title.value).length}`)
        if(Books.filter(obj=>obj.title===myform.title.value).length == 0)
        {
            Books.push(new Book(myform.title.value, myform.author.value, myform.pages.value, myform.read.value));
        }
        else
        {
            console.warn("Book already exists!");
            alert("Book already exists!");
        }
    }
    else
    {
        console.warn("Incorrect inputs!");
        alert("Incorrect inputs!");
    }
    updateLibrary();
}

function updateLibrary()
{
    const tBody = document.querySelector("#library tbody");
    const library2 = document.querySelector("#library2");
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