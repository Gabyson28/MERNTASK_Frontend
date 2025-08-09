import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando";
  return (
   <>
  {auth._id ? (
    <div className="bg-gray-100">
      <Header />
      <div className="flex flex-col md:flex-row md:min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-auto flex justify-center md:block">
          <Sidebar />
        </div>

        {/* Contenido */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  )}
</>
  );
};

export default RutaProtegida;
