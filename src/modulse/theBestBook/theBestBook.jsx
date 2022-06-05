import React from "react";
import './theBestBook.css'

export default React.memo(function TheBestBook(props){

    let theBestReting = 0
    let filterTimeBooks = props.books.filter(book => {
        book.rating > theBestReting ? theBestReting = book.rating : book.rating = book.rating
        return (book.yearPublication <= (new Date().getFullYear() - 3))
    })

    let filterRatingBooks = filterTimeBooks.filter(book => {
        return book.rating == theBestReting
    })

    let theBestIndex = 0
    if (filterRatingBooks.length >= 1) {
        theBestIndex = Math.floor(Math.random() * (filterRatingBooks.length));
    }

    return (
        <div>{filterRatingBooks.map((e, i) => {
            if (i == theBestIndex) {
                return <div className="theBestBook">
                    <div>{e.name}</div>
                    <div>{`Автор:  ${e.author}`}</div>
                    <div>{`Издана:  ${e.yearPublication}`}</div>
                    <div>{`Рейтинг:  ${e.rating}`}</div>
                    <div>{`isbn:  ${e.isbn}`}</div>
                </div>
            }
        })}</div>

    )
})