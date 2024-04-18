import UploadPage from "../components/UploadPage";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const CreateBlog = () => {
  const { currentUser } = useAuth();

  async function handleAction(content) {
    return await axios.post(`/api/post/`, {
      ...content,
      user: currentUser.username,
    });
  }
  const data = { title: "", desc: "", image: "", text: "" };
  return (
    <div className="flex">
      <UploadPage
        post={data}
        handleAction={handleAction}
      />
    </div>
  );
};

export default CreateBlog;
