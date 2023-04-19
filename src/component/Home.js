import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import { getDocs, collection } from 'firebase/firestore';


function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getAllPosts() {
            await getDocs(collection(firestore, 'posts'))
                .then((snapshot) => {
                    const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    setPosts(newData);
                    return newData;
                });
        }

        getAllPosts();
    }, []);

    if (posts.length === 0) return <div>Loading...</div>;

    return (
        <div className="home">
            <h1>React Blogs</h1>
            <div id="blog-by">Biswajeet</div>
            {
                posts.map((post, index) => {
                    return (
                        <div className="post" key={`post-${index}`}>
                            <Link to={`post/${post.id}`}>
                                <h3>{post.title}</h3>
                            </Link>

                            <p>{post.subTitle}</p>
                        </div>
                    )
                })
            }
        </div >
    );
}

export default Home;