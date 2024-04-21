import { useLocation } from "react-router-dom";
import UploadPage from "../components/UploadPage";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const EditBlog = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const data = location.state;

  async function handleAction(content) {
    return await axios.put(`/api/post/${data.post_id}`, content, {
      headers: {
        Authorization: `Bearer ${await currentUser.getIdToken()}`, // Attach the token as a Bearer token
      },
    });
  }

  return (
    <div className="flex">
      <UploadPage post={data} handleAction={handleAction} />
    </div>
  );
};

export default EditBlog;
