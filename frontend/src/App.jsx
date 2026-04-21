import Button from './components/atoms/Button/Button';
import Label from './components/atoms/Input/Input';
import Badge from './components/atoms/Badge/Badge';
import Avatar from './components/atoms/Avatar/Avatar';
import StatCard from './components/molecules/StatCard/StatCard';
import SearchBar from './components/molecules/SearchBar/SearchBar';
import FormGroup from './components/molecules/FormGroup/FormGroup';

function App() {
  return (
    // teste dos atoms
    <>
      <Button variant="secondary">Teste</Button>
      <Label placeholder="Digite algo"></Label>
      {/* teste de badges */}
      <Badge status={'enviado'}></Badge>
      <Badge status={'pago'}></Badge>
      <Badge status={'pendente'}></Badge>
      <Avatar name={'Lucas Queiroz Vieira'}></Avatar>
      <StatCard label={'teste'} value={'outro teste'} sub={'testee'}></StatCard>
      <StatCard label={'teste'} value={'outro teste'} sub={'testee'}></StatCard>
      <StatCard label={'teste'} value={'outro teste'} sub={'testee'}></StatCard>
      <SearchBar></SearchBar>
    </>
  );
}

export default App;
