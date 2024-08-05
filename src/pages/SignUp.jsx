import { Link, useNavigate } from "react-router-dom";
import signinImg from "../assest/signin.gif";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
const SignUp = () => {
  const [profilePicUrl, setProfilePicUrl] = useState(signinImg);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const fileInput = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());
    formData["profilePic"] = profilePicUrl;

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.error) {
      toast.error(data.message);
      setSubmitting(false);
      throw new Error(data.message);
    }
    if (data.success) {
      toast.success(data.message);
      navigate("/login");
      setSubmitting(false);
    }
  };

  const openFileChooser = () => {
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setProfilePicUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="bg-white p-4 mt-10 w-full md:w-1/3 mx-auto">
      <div className="relative">
        <img
          src={profilePicUrl}
          alt="Signin Logo"
          className="rounded-full m-auto my-3 w-[120px] h-[120px] object-cover"
        />
        <div
          onClick={() => fileInput.current.click()}
          className="absolute cursor-pointer top-[65px] left-[130px] md:left-[204px] w-[120px] bg-gray-100 h-[56px] rounded-bl-full rounded-br-full"
        >
          <div className="flex items-center justify-center h-[56px]">
            <span className="">Upload</span>
            <input
              ref={fileInput}
              accept="image/*"
              onChange={openFileChooser}
              type="file"
              name="profilePic"
              className="hidden"
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Email"
            className="outline-none rounded-md bg-slate-100 h-[35px] p-2 focus:shadow-sm"
            required
          />
        </div>
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

        <div className="flex flex-col gap-2">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Password"
            className="outline-none rounded-md bg-slate-100 h-[35px] p-2 focus:shadow-sm"
            required
          />
        </div>

        <p className="text-right">
          Already have an account?{" "}
          <Link to={"/login"} className="text-fuchsia-700">
            Login
          </Link>
        </p>

        <button disabled={submitting} className="bg-fuchsia-700 text-white mt-5 p-3 rounded-md">
          {submitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
