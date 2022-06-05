import { useEffect, useState } from 'react';
import './App.css';
import { Books } from './modulse/books/books';
import db from './modulse/firebase'
import { collection, onSnapshot } from 'firebase/firestore';
import Modal from './modulse/moduleWindowAdd/moduleWindowAdd';
import TheBestBook from './modulse/theBestBook/theBestBook';

import React from 'react';
function App() {

  const [books, setBooks] = useState([])
  const [modalActive, setModalActive] = useState(false)
  const [filter, setFilter] = useState({ value: 'yearPublication' })

  useEffect(() =>
    onSnapshot(collection(db, 'books'), (snapshot) =>
      setBooks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    ), [])


  return (
    <div className='app'>
      <header className='header'>
        <h1>Каталог Книг</h1>
      </header>

      <div className='container1'>
        <main className='main'>

          <button onClick={() => setModalActive(true)} className='btn'>Добавить Книгу</button>
          <h2>Рекомендация к прочтению:</h2>
          <TheBestBook books={books} />
          <Modal active={modalActive} setActive={setModalActive} />
          <div className="container">
            <section className="column">
              <h2>Доступный Каталог</h2>
              <div className='groupButtons'>
                <button className='buttonfilter' onClick={() => setFilter({ ...filter, value: 'rating' })}>Сгруппировать по рейтингу</button>
                <button className='buttonfilter' onClick={() => setFilter({ ...filter, value: 'author' })}>Сгруппировать по автору</button>
                <button className='buttonfilter' onClick={() => setFilter({ ...filter, value: 'yearPublication' })}>Сгруппировать по году</button>
              </div>
              <div>
                <Books books={books} filter={filter} />
              </div>
            </section>
          </div>

        </main>
      </div>

      <footer className='footer'>
        <h1>:D</h1>
      </footer>
    </div >
  );
}

export default App;
