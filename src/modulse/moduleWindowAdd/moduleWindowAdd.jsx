import React, { useState } from "react";
import "./modal.css"
import db from '../firebase'
import { addDoc, collection } from 'firebase/firestore';
import { useForm } from 'react-hook-form'

const Modal = ({ active, setActive }) => {

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur"
    })

    const [errorActive, setErrorActive] = useState({
        text: "",
        toggle: false,
        color: 'red'
    })

    const handleNew = async (data) => {

        const name = data.name
        const author = data.author
        const rating = data.rating
        const yearPublication = data.yearPublication
        const isbn = data.isbn

        try {
            const colletionRef = collection(db, "books") 
            const payload = { name, author, rating, yearPublication, isbn }
            const docRef = await addDoc(colletionRef, payload) / 
            reset()
            setErrorActive({
                ...errorActive,
                text: "Книга успешно добавлена!",
                toggle: true,
                color: 'green'
            })
        }
        catch (e) {
            console.error("Error adding document: ", e);
            setErrorActive({
                ...errorActive,
                text: "Ошибка, неудалось добавить книгу в БД!",
                toggle: true,
                color: 'red'
            })
        }
    }

    const clearActive = () => {
        setActive(false)
        setErrorActive(false)
    }

    const date = new Date().getFullYear();

    const validateISBN = (value) => {
        const re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
        if(value===''){
            return true
        }
        if (!re.test(value)) {
            return false
        }
        return true
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={clearActive}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit(handleNew)}>
                    <div className="blok__data">
                        <label>Название книги:</label>
                        <input {...register('name', {
                            required: "Поле обязательно к заполнению!",
                            maxLength: {
                                value: 200,
                                message: "Максимум 200 символов!"
                            }
                        })} />
                    </div>
                    <div className="error">{errors?.name && <p>{errors?.name?.message || 'Error'}</p>}</div>
                    <div className="blok__data">
                        <label>Автор книги:</label>

                        <input {...register('author', {
                            required: "Поле обязательно к заполнению!",
                        })} />
                    </div>
                    <div className="error">{errors?.author && <p>{errors?.author?.message || 'Error'}</p>}</div>
                    <div className="blok__data">
                        <label>Год публикации: </label>
                        <input type="number" {...register('yearPublication', {
                            min: {
                                value: 1799,
                                message: "Книга должна издана не раньше 1800г!"
                            },
                            max: {
                                value: date,
                                message: "Эта книга из будушего?"
                            }
                        })} />
                    </div>
                    <div className="error">{errors?.yearPublication && <p>{errors?.yearPublication?.message || 'Error'}</p>}</div>
                    <div className="blok__data">
                        <label> Рейтинг книги: </label>
                        <input type="number" {...register('rating', {
                            min: {
                                value: 0,
                                message: "Рейтирг не меньше 0!"
                            },
                            max: {
                                value: 10,
                                message: "Рейтинг не более 10!"
                            }
                        })} />
                    </div>
                    <div className="error">{errors?.rating && <p>{errors?.rating?.message || 'Error'}</p>}</div>
                    <div className="blok__data">
                        <label> ISBN книги: </label>
                        <input {...register('isbn', {
                            validate: value => validateISBN(value),
                            
                        })} />
                    </div>
                    <div className="error">{errors?.isbn && 'Введенный ISBN не валиден!'}</div>
                    <input className="submit" type="submit" value="Добавить книгу" />
                </form>
                <div className={errorActive.toggle ? errorActive.color === "red" ? "subModal active_red" : "subModal active_green" : "subModal"}>{errorActive.text}</div>
            </div>
        </div>
    )
}
export default Modal