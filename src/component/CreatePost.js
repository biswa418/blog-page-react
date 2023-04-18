import { useState } from "react";
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';


function CreatePost() {

    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await addDoc(collection(firestore, 'posts'), {
                title,
                subTitle,
                content,
                createdAt: new Date()
            });
        }
        catch (error) {
            console.error('Error writing new post to Firebase Database', error);
        }
    }

    return (
        <div className="create-post">
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="form-field">
                    <label>Sub Title</label>
                    <input value={subTitle} onChange={(e) => setSubTitle(e.target.value)} required />
                </div>

                <div className="form-field">
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>

                <button className="create-post-btn">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;