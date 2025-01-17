function Book(bookName, authorName, bookPrice, status){
    this.bookName = bookName;
    this.authorName = authorName;
    this.bookPrice = bookPrice;
    this.status = status;
}

function addBookToLibrary(title, author, price, status){
    const book = new Book(title, author, price, status);

    console.log(book);
}

addBookToLibrary('sapiens', 'noah', '450', 'reading');