import MasVendidos from '../components/mas-vendidos';
import LineaResidencial from '../components/linea-residencial';
import LineaAutomotriz from '../components/linea-automotriz';
import LineaComercial from '../components/linea-comercial';
import '../styles/home-tienda.css'
const Tienda = () => {
  return (
    <div className='div-tienda-home'>
      <MasVendidos />
      <LineaComercial />
      <LineaResidencial />
      <LineaAutomotriz />
    </div>
  );
}
export default Tienda;