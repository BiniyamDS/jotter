import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Content from "../components/Content";

const Post = () => {
  const [post, setPost] = useState();
  const { postId } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get(`/api/post/${postId}`);
        setPost(data.post[0]);
        // console.log(`id: ${data.post.id}, postId: ${postId}`)
        // console.log(data.post[0].id)
      } catch {
        return null;
      }
    }
    fetchPost();
  }, []);

  return <div className="flex">{post && <Content post={post} />}</div>;
};

export default Post;
