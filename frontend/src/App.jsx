import { BrowserRouter, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import Persona from "./components/Persona";
import Habitacion from "./components/Habitacion";
import Reserva from "./components/Reserva";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Reserva /> },
    { path: "/persona", element: <Persona /> },
    { path: "/habitacion", element: <Habitacion /> },
  ]);

  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
