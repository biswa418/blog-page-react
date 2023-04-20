import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from "../firebase";

function PostDetail() {
    const [post, setPost] = useState({});
    const { postId } = useParams();

    useEffect(() => {

        async function getDocfromDB() {
            try {
                const docFile = await getDoc(doc(firestore, 'posts', postId));

                setPost(docFile.data());

            } catch (err) {
                console.error('error in getting the file', err);
            }
        }

        getDocfromDB();
    }, [postId]);

    let datePresent = false;
    let time = null;

    if (post.createdAt) {
        datePresent = true;
        time = new Date(post.createdAt.seconds * 1000).toString().slice(0, 15);
    }

    return (
        <div className="post-detail">
            <h1>{post.title}</h1>
            <p className="time">{datePresent && time}</p>
            <h2>{post.subTitle}</h2>
            <p>{post.content}</p>
        </div>
    );
}

export default PostDetail;