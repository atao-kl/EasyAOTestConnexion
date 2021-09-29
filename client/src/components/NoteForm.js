import { useState } from 'react';
import axios from 'axios';
const NoteForm = (props) => {
    const { didSubmit } = props;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const handleSubmit = event => {
        event.preventDefault();
        submitNote();
    };
    const submitNote = async () => {
        await axios.post('/api/notes', { title: title, body: body });
        setBody('');
        setTitle('');
        didSubmit();
    };
    return (
        <div>
            <h2>Formulaire de remarque</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titre:</label>
                <input
                    name='title'
                    placeholder='Titre'
                    type='text'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <br />
                <label htmlFor="body">Objet:</label>
                <textarea
                    name='body'
                    placeholder='Objet'
                    value={body}
                    onChange={event => setBody(event.target.value)}
                />
                <br />
                <button type='submit'>Enregistrer la note</button>
            </form>
        </div>
    );
};

export default NoteForm;