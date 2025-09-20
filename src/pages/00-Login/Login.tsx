import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import BgImg from "../../assets/login/loginImg.jpg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      {" "}
      <Toast ref={toast} />
      <div
        className="rounded-[56px] p-[0.3rem] w-full max-w-2xl"
        style={{
          background:
            "linear-gradient(180deg, #047f94 10%, rgba(33, 150, 243, 0) 30%)",
        }}
      >
        <div className="w-full rounded-[53px] bg-white/20 backdrop-blur-lg py-20 px-6 sm:px-8 shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Welcome!
            </h1>
            <p className="text-gray-600">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-gray-900 font-medium text-lg mb-2"
              >
                Email
              </label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full"
                required
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-gray-900 font-medium text-lg mb-2"
              >
                Password
              </label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                feedback={false}
                toggleMask
                className="w-full"
                inputClassName="w-full"
                required
              />
            </div>
            <div className="flex justify-end">
              <p>Forgot Password ?</p>
            </div>

            <Button
              type="submit"
              label={loading ? "Logging in..." : "Login"}
              className="w-full p-3 mt-3 text-lg bg-[#047f94] text-white uppercase font-bold rounded-lg disabled:opacity-60"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
