import {Note} from './Note.js'
import { NoteList } from './NoteList.js'



let list = new NoteList(document.getElementById('app'), 'my');


document.getElementById('action').addEventListener('click', function() {
    list.add(prompt('Название дела'))
    console.log(list);
})