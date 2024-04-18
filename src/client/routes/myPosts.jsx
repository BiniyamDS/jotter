import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";

const YourPosts = () => {
  const [posts, setPosts] = useState();
  const { currentUser } = useAuth();
  let align = false;

  async function fetchPosts() {
    const { data } = await axios.get("/api/posts");
    const userPosts = data.filter(
      (post) => post.createdBy === currentUser.username
    );
    setPosts(userPosts);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-2 flex flex-col">
      <h1 className="text-4xl mx-auto">Your Posts</h1>
      <button className="btn !ml-16 w-64">Create new post</button>
      <ul className="mx-auto p-2">
        {posts &&
          (posts.length > 0 ? (
            posts.map((post) => {
              align = !align;
              return <PostCard key={post.id} post={post} align={align} />;
            })
          ) : (
            <h1>You currently have no posts</h1>
          ))}
      </ul>
    </div>
  );
};

export default YourPosts;
