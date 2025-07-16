import MasVendidos from '../components/mas-vendidos';
import LineaResidencial from '../components/linea-residencial';
import LineaAutomotriz from '../components/linea-automotriz';
import LineaComercial from '../components/linea-comercial';

const Tienda = () => {
  return (
    <div>
      <MasVendidos />
      <LineaComercial />
      <LineaResidencial />
      <LineaAutomotriz />
    </div>
  );
}
export default Tienda;