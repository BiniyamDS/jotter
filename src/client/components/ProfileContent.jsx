import { useAuth } from "../contexts/AuthContext";
import LoadingButton from "../components/LoadingButton";

const ProfileContent = () => {
  const { logout, currentUser } = useAuth();

  return (
    <div className="p-6 text-xl flex flex-wrap">
      <div className="w-full">
        <h1 className="inline font-bold">Email: </h1>
        {currentUser.email}
      </div>
      <div className="mx-auto">
        <LoadingButton
          name="Log out"
          handleAction={logout}
        />
      </div>
    </div>
  );
};

export default ProfileContent;
