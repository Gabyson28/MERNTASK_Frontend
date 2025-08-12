import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setAuth(data);
      setAlerta({});
      navigate("/proyectos");
    },
    onError: (error) => {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    },
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }
    loginMutation.mutate({ email, password });
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    try {
      const { data, isFetching } = useMutation(
        ["login", email, password],
        async () => {
          const { data } = await clienteAxios.post("/usuarios/login", {
            email,
            password,
          });
          return { data, isFetching };
        }
      );

      // const { data } = await clienteAxios.post("/usuarios/login", {
      //   email,
      //   password,
      // });

      localStorage.setItem("token", data.token);

      setAuth(data);
      setAlerta({});
      navigate("/proyectos");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors flex justify-center items-center"
        >
          {loginMutation.isPending ? (
            <div className="animate-spin rounded-full h-5 w-5 border-4 border-white border-t-transparent"></div>
          ) : (
            "Iniciar Sesión"
          )}
        </button>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm uppercase"
          to={"registrar"}
        >
          No tienes una cuenta? Regístrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 text-sm uppercase"
          to={"olvide-password"}
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
