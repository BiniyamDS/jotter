import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout, accessToken } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <div>Profile page for {currentUser.email}!{" "}
      <button className="btn" onClick={handleLogout}>
        Log out!
      </button>
      <p>{accessToken}</p>
    </div>
  )
}

export default Profile