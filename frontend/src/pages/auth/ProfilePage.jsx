import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Camera, Circle, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isCheckingAuth, isUpdatingUser, updateUser } =
    useAuthStore();
  console.log("👉 ~ ProfilePage ~ authUser:", authUser);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      navigate("/", { replace: true });
    }
  }, [authUser]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setPreview(base64Image);
      await updateUser({ avatar: base64Image });
    };
  };

  return (
    <div className="min-h-100">
      <div className="max-w-xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-base-content/60">
              View all your profile details here
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                className="size-32 rounded-full object-cover ring-offset-primary ring-primary ring-2 ring-offset-2"
                src={preview || authUser?.avatar || "/avatar.png"}
                alt={authUser?.name}
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-primary hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-300 border-1 border-base-100/50"
                onClick={handleImageClick}
                disabled={isUpdatingUser}
              >
                <Camera className="size-5 text-base-200" />
              </button>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isUpdatingUser}
              />
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingUser
                ? "Updating..."
                : "Click the camera icon to update your profile picture."}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-5" />
                Full name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.name}
              </p>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="size-5" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.email}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member since </span>
                  <span>{authUser?.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2 ">
                  <span>Account Status</span>
                  <span>
                    <Circle className="size-4 bg-green-500 rounded-full border-0" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
