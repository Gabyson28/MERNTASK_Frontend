import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="w-full md:w-1/3 lg:w-[11%] xl:w-[200.66%] px-5 py-5 md:py-10 flex flex-col items-center md:items-start">
  <p className="text-xl font-bold text-center md:text-left">
    Hola: {auth.nombre}
  </p>

  <Link
    className="bg-sky-600 w-full md:w-auto p-3 uppercase font-bold text-white mt-5 text-center rounded-lg"
    to={"crear-proyecto"}
  >
    Nuevo Proyecto
  </Link>
</aside>
  );
};

export default Sidebar;
