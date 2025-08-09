import FormularioProyecto from "../components/FormularioProyecto";

const NuevoProyecto = () => {
  return (
    <>
     <div className="flex flex-col items-center">
  <h1 className="text-4xl font-black text-center">Crear Proyecto</h1>

  <div className="mt-10 w-full flex justify-center">
    <FormularioProyecto />
  </div>
</div>
    </>
  );
};

export default NuevoProyecto;
