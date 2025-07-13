import { Eye, EyeOff, KeyRound, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "../../store/useAuthStore";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterPage = () => {
  const { setTitle, setDescription } = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { registerAccount, isRegisering, authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/", { replace: true });
    }
  }, [authUser, navigate]);

  useEffect(() => {
    setTitle("Create an account");
    setDescription(
      "Join us to unlock the full potential of our platform. Register now and start your journey!"
    );
  }, [setTitle, setDescription]);

  const onSubmit = async (data) => {
    await registerAccount({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <form
        className="w-full max-w-sm space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control">
          <label className="label">
            <span className={`label-text ${errors.name && "text-error"}`}>
              Full name
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-2">
              <User className="size-5 text-base-content/70" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              className={`input  w-full pl-10 focus:outline-none ${
                errors.name ? "input-error" : "border-base-content/60"
              }`}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-error block">{errors.name.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className={`label-text ${errors.email && "text-error"}`}>
              Email
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-2">
              <Mail className="size-5 text-base-content/70" />
            </div>
            <input
              type="email"
              placeholder="yourEmail@example.com"
              className={`input  w-full pl-10 focus:outline-none ${
                errors.email ? "input-error" : "border-base-content/60"
              }`}
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className={`label-text ${errors.password && "text-error"}`}>
              Password
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-2">
              <Lock className="size-5 text-base-content/70" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              className={`input w-full pl-10 focus:outline-none ${
                errors.password ? "input-error" : "border-base-content/60"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-2"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <Eye className="size-5 text-base-content/70" />
              ) : (
                <EyeOff className="size-5 text-base-content/70" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className={`label-text ${errors.rePassword && "text-error"}`}>
              Confirm Password
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-2">
              <KeyRound className="size-5 text-base-content/70" />
            </div>
            <input
              type={showRePassword ? "text" : "password"}
              placeholder="*********"
              className={`input w-full pl-10 focus:outline-none ${
                errors.rePassword ? "input-error" : "border-base-content/60"
              }`}
              {...register("rePassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-2"
              onClick={() => {
                setShowRePassword(!showRePassword);
              }}
            >
              {showRePassword ? (
                <Eye className="size-5 text-base-content/70" />
              ) : (
                <EyeOff className="size-5 text-base-content/70" />
              )}
            </button>
          </div>
          {errors.rePassword && (
            <p className="text-error">{errors.rePassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full rounded-lg mt-1.5"
          disabled={isRegisering}
        >
          {isRegisering ? (
            <span className="loading loading-dots loading-xl"></span>
          ) : (
            <span className="animate__animated animate__jello">Register</span>
          )}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
