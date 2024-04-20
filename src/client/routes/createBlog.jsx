import UploadPage from "../components/UploadPage";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const CreateBlog = () => {
  const { currentUser } = useAuth();

  async function handleAction(content) {
    return await axios.post(`/api/post/`, {
      ...content,
      user: currentUser.email,
    }, {headers: {
      Authorization: `Bearer ${ await currentUser.getIdToken()}`, // Attach the token as a Bearer token
    },});
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
