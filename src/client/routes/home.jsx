import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState();

  async function fetchPosts() {
    const { data } = await axios.get("/api/posts");
    setPosts(data);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <ul className="flex flex-wrap w-3/4 mx-auto p-2">
        {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
      </ul>
    </div>
  );
};

export default Home;
