import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/organisms/Topbar/Topbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Clientes from './pages/Clientes/Clientes';
import Boletos from './pages/Boletos/Boletos';

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/boletos" element={<Boletos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
