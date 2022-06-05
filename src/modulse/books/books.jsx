import React from "react";
import { handleDelete } from "../util";
import './books.css'

export const Books = (props) => {
    let map1 = new Map(props.books.map(o => {
        
        return [o[props.filter.value], []]
        
    }));
    for (let o of props.books) {
        map1.get(o[props.filter.value]).push(o);
    }
   
    let map2 = [...map1.values()];

    map2.sort((a, b) => {
        if (a[0][props.filter.value] === null) {
            return -1
        }
        if (a[0][props.filter.value] > b[0][props.filter.value]) {
            return -1
        }
        if (a[0][props.filter.value] < b[0][props.filter.value]) {
            return 1
        }
        return 0;
    })

    return (
        <ul className="ulBoox">
            {map2.map((e, i) => {
                return <div className="accordion" key={i}>
                    <input type='checkbox' className='checkbox-accordion' id={`g${i}`} />
                    <label className="accordion__header" htmlFor={`g${i}`}>{e[0][props.filter.value] ? e[0][props.filter.value] : props.filter.value==="rating"? "Книги без рейтинга":"Книги без даты"}</label>
                    <div className="accordion__content">
                        {e.length > 1 ?
                            e
                                .sort((a, b) => {
                                    if (a.name > b.name) {
                                        return 1
                                    }
                                    if (a.name < b.name) {
                                        return -1
                                    }
                                    return 0
                                })
                                .map((k, i) => {
                                    return <div className="containerUl" >
                                        <ul className="ulContent">
                                            <li><h3>{k.name}</h3></li>
                                            <li>{`Автор:  ${k.author}`}</li>
                                            <li>{`Издана:  ${k.yearPublication}`}</li>
                                            <li>{`Рейтинг:  ${k.rating}`}</li>
                                            <li>{`isbn:  ${k.isbn}`}</li>
                                        </ul>
                                        <button className="buttonUl" onClick={() => handleDelete(k.id)}>Удалить</button>
                                    </div>
                                })
                            :
                            <div className="containerUl">
                                <ul className="ulContent">
                                    <li><h3>{e[0].name}</h3></li>
                                    <li>{`Автор:  ${e[0].author}`}</li>
                                    <li>{`Издана:  ${e[0].yearPublication}`}</li>
                                    <li>{`Рейтинг:  ${e[0].rating}`}</li>
                                    <li>{`isbn:  ${e[0].isbn}`}</li>
                                </ul>
                                <button className="buttonUl" onClick={() => handleDelete(e[0].id)}>Удалить</button>
                            </div>
                        }
                    </div>
                </div>
            })}
        </ul>
    )
}