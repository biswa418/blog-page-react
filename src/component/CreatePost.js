// import { useState } from "react";
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useFormSubmit } from '../hooksSubmit';


function CreatePost() {

    const title = useFormSubmit('');
    const subTitle = useFormSubmit('');
    const content = useFormSubmit('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await addDoc(collection(firestore, 'posts'), {
                title: title.value,
                subTitle: subTitle.value,
                content: content.value,
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
                    <input {...title} required />
                </div>

                <div className="form-field">
                    <label>Sub Title</label>
                    <input {...subTitle} required />
                </div>

                <div className="form-field">
                    <label>Content</label>
                    <textarea {...content} required></textarea>
                </div>

                <button className="create-post-btn">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;