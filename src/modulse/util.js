import db from './firebase'
import {deleteDoc, doc, serverTimestamp, updateDoc} from 'firebase/firestore';

// export const handelEdit = async (id) => {
//     const name = prompt("Enter color name")
//     const value = prompt("Enter color value")

//     const docRef = doc(db, "color", id) // плная ссылка на объект который будем менять с индификатором 
//     const payload = { name, value,timestamp:serverTimestamp() }
//     await updateDoc(docRef, payload) // обновляет те своиства кторые указанны
//     //await setDoc(docRef, payload)
// }

export const handleDelete = async (id) => {
    if(window.confirm("Вы действительно хотите удалить книгу?")){
        const docRef = doc(db, "books", id);
        await deleteDoc(docRef)
    }
}