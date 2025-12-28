import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:8088/ecomer/api/auth?action=register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user,
            fullname: fullname,
            password: password,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        // lưu user
        // localStorage.setItem("user", JSON.stringify(data.user));
        alert("Đăng ký thành công, vui lòng đăng nhập");
        // chuyển sang trang chủ
        navigate("/login");
      } else {
        alert(data.message || "Sai");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen w-full bg-white relative">
        {/* Teal Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)
      `,
            backgroundSize: "100% 100%",
          }}
        />
        {/* Your Content/Components */}
        <div className="mx-auto flex items-center flex-col justify-center h-screen relative z-10">
          <h1 className="sm:text-4xl text-2xl font-bold text-[#00B207]">
            ĐĂNG KÝ TÀI KHOẢN
          </h1>
          <p className="text-[#737373] sm:mt-4 mt-1 sm:text-[16px] text-[14px]">
            Bắt đầu hành trình thời trang bền vững
          </p>

          <form
            onSubmit={handleSignUp}
            className="flex flex-col w-[60%] mx-auto mt-8 sm:mt-18"
          >
            <input
              onChange={(e) => setUser(e.target.value)}
              type="text"
              className="sm:p-4 p-2 w-full rounded-2xl border"
              placeholder="User Name"
            />
            <input
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              className="sm:p-4 p-2 w-full rounded-2xl border mt-4 sm:mt-8"
              placeholder="Full Name"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="sm:p-4 p-2 w-full rounded-2xl border mt-4 sm:mt-8"
              placeholder="Password"
            />
            <Link to={"/login"}>
              <p className="text-blue-400 text-[12px] sm:text-[16px] mt-2 text-end cursor-pointer">
                Bạn đã có tài khoản ?
              </p>
            </Link>
            <div className="w-full mt-4 sm:mt-8">
              <button
                type="submit"
                className="rounded-3xl bg-[#00B207] py-2 sm:text-xl font-bold text-white w-full cursor-pointer hover:bg-[#254C22]"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
