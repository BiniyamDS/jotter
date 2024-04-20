import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Content from "../components/Content";
import { useAuth } from "../contexts/AuthContext";

const Post = () => {
  const [post, setPost] = useState();
  const { postId } = useParams();
  const {currentUser} = useAuth()

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log("hello");
        const { data } = await axios.get(`/api/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`, // Attach the token as a Bearer token
          },
        });
        setPost(data.post[0]);
        // console.log(`id: ${data.post.id}, postId: ${postId}`)
        // console.log(data.post[0].id)
      } catch(err) {
        console.log(`Error:${err}`)
      }
    }
    fetchPost();
  }, []);

  return <div className="flex">{post && <Content post={post} />}</div>;
};

export default Post;
