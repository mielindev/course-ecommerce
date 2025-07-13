import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthImagePattern from "../../components/auth/_AuthImagePattern";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const AuthLayout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { authUser, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      navigate("/", { replace: true });
    }
  }, [authUser]);
  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-column justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center">
                <Link
                  to="/"
                  className="text-4xl tracking-tight text-primary cursor-pointer font-anton "
                >
                  Learnfy
                </Link>
              </div>
              <h1 className="text-2xl font-bold">Code your future</h1>
            </div>
          </div>
          <Outlet context={{ setTitle, setDescription }} />
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern title={title} description={description} />
    </div>
  );
};

export default AuthLayout;
