import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import signIn from "../../queries/sign/sign-in";
import "./index.sass";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("visiteur@gmail.com");
  const [password, setPassword] = useState("visiteur123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await signIn(email, password);
      if (res.error) {
        setError("Erreur lors de la connexion. Veuillez réessayer.");
      } else {
        window.location.href = "/";
      }
    } finally {
      setIsLoading(false);
    }
  };

  const bg =
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWE2eTIyNmc2dnpudDd5ZGxhNjZjajZib2M1MnBja2RpNWx2Zm0yayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0slU7u7quJuZ3O/giphy.gif";

  return (
    <>
      <div
        className="transition-screen"
        style={{
          background: "#000000",
        }}
      />
      <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
        <div
          className="md:w-[47rem] h-[100vh] p-8 md:p-12 flex flex-col animate-fade-in"
          style={{ backgroundColor: "#f5f5f3" }}
        >
          <div className="mb-8 -translate-x-2 flex gap-2 items-center">
            {/* <img src="/logo-dark.png" alt="Logo" className="text-sm w-8 h-8  animate-fade-in-up" /> */}
            <h1 className="-ml-2 text-xl font-medium animate-fade-in-up"></h1>
          </div>

          <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
            <h2 className="text-xl font-semibold mb-7 animate-fade-in-up stagger-delay-100">
              Connexion
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="space-y-2 animate-fade-in-up stagger-delay-200">
                <label htmlFor="email" className="uppercase text-xs font-medium text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-sm focus:outline-none focus:ring-1"
                  style={{ focusRingColor: "#1a1a1a" }}
                  required
                />
              </div>

              <div className="space-y-2 animate-fade-in-up stagger-delay-300">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="uppercase text-xs font-medium text-gray-500">
                    Mot de passe
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-sm focus:outline-none focus:ring-1"
                    style={{ focusRingColor: "#1a1a1a" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white hover:scale-95 transition-all duration-200 text-sm rounded-sm hover:bg-opacity-90 cursor-pointer animate-fade-in-up stagger-delay-400"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                Se connecter
              </button>
              <div className="flex mt-2">
                {error && (
                  <div className="flex bg-red-100 w-full rounded-sm p-2 justify-center items-center">
                    <div className="text-red-500 text-sm  animate-fade-in-up">{error}</div>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="mt-auto pt-8 text-left text-lg text-gray-500 animate-fade-in">
            <span
              onClick={() => {
                navigate("/sign-up");
              }}
              className="cursor-pointer"
            >
              Créer un compte
            </span>
          </div>
        </div>

        <div
          className="hidden md:block w-full relative animate-fade-in m-3 rounded-lg"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#0c0d0e9d] bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-white"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
