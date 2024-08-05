import { Link, useNavigate } from "react-router-dom";
import signinImg from "../assest/signin.gif";
import { toast } from "react-toastify";
import { setUserDetails, fetchUserDetails } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    const dataResponse = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const res = await dataResponse.json();
    if (res.error) {
      toast.error(res.message);
      setSubmitting(false)
      throw new Error(res.message);
    }
    if (res.success) {
      toast.success(res.message);
      navigate("/");
      setSubmitting(false)
      const user = await fetchUserDetails();
      dispatch(setUserDetails(user));
    }
  };
  return (
    <div className="bg-white p-4 mt-10 w-full md:w-1/3 mx-auto">
      <img
        src={signinImg}
        alt="Signin Logo"
        className="rounded-full m-auto my-3 w-[120px]"
      />
      <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="outline-none rounded-md bg-slate-100 h-[35px] p-2 focus:shadow-sm"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="outline-none rounded-md bg-slate-100 h-[35px] p-2 focus:shadow-sm"
            required
          />
        </div>
        <p className="text-right">
          Forgot password?{" "}
          <Link to={"/forgot-password"} className="text-fuchsia-700">
            Forgort Password
          </Link>
        </p>

        <p className="text-right">
          You do not have an account{" "}
          <Link to={"/signup"} className="text-fuchsia-700">
            Sign Up
          </Link>
        </p>

        <button disabled={submitting} className="bg-fuchsia-700 text-white mt-5 p-3">{submitting ? 'Please Wait ...' :  'Login'}</button>
      </form>
    </div>
  );
};

export default Login;
