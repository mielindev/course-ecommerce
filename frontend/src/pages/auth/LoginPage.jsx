import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { setTitle, setDescription } = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);
  const { authUser, isLoggingIn, loginAccount } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    setTitle("Welcome back!");
    setDescription(
      "Enter your login credentials to access your account. If you don't have one, you can register one."
    );
  }, [setTitle, setDescription]);

  const onSubmit = (data) => {
    loginAccount(data);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text text-md">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-2">
              <Mail size={20} className="text-base-content/40" />
            </div>
            <input
              id="login-email"
              name="login-email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full pl-10 focus:outline-none"
              {...register("email")}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-md">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-2">
              <Lock size={20} className="text-base-content/40" />
            </div>
            <input
              id="login-password"
              name="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input w-full pl-10 focus:outline-none"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <Eye className="size-5 text-base-content/40" />
              ) : (
                <EyeOff className="size-5 text-base-content/40" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full rounded-lg"
          disabled={isLoggingIn}
        >
          <span className="animate__animated animate__jello">Login</span>
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-base-content/60">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
