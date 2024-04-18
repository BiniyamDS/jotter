import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState();
  let align = false


  async function fetchPosts() {
    const { data } = await axios.get("/api/posts");
    setPosts(data);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <ul className="mx-auto p-2">
        {posts && posts.map((post) => {
        align = !align
        return <PostCard key={post.id} post={post} align={align}/>})}
      </ul>
    </div>
  );
};

export default Home;
