import { useLocation } from "react-router-dom";
import UploadPage from "../components/UploadPage";
import axios from 'axios'

const EditBlog = () => {
  const location = useLocation();

  const data = location.state;

  async function handleAction(content) {
    return await axios.put(`/api/post/${data.id}`, content);
  }

  return (
    <div className="flex">
      <UploadPage post={data} handleAction={handleAction}/>
    </div>
  );
};

export default EditBlog;
