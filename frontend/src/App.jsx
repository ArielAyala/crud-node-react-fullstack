import { BrowserRouter, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import Persona from "./pages/Persona";
import Habitacion from "./pages/Habitacion";
import Reserva from "./pages/Reserva";

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
    <BrowserRouter basename="/crud-node-react-fullstack">
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
