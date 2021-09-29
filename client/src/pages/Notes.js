import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';

const Notes = function () {
    const [notes, setNotes] = useState([]);
    const [refresh, toggleRefresh] = useState(0);
    const refreshParent = () => {
        toggleRefresh(refresh + 1);
    };

    useEffect(() => {
        fetchNotes();
    }, [refresh]);

    async function fetchNotes() {
        const { data } = await axios.get('/api/notes?include=User');
        setNotes(data);
    }
    return (
        <div>
            <h2>Remarques</h2>
            <ol>
                {notes.map(note => {
                    return (
                        <li key={note.id}>
                            <strong>{note.title}</strong> {note.body} <sub>de: {note.User.email}</sub>
                        </li>
                    );
                })}
            </ol>
            <NoteForm didSubmit={refreshParent} />
        </div>
    );
};

export default Notes;