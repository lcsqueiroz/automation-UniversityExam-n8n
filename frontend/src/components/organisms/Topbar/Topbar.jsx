import { useLocation, Link } from 'react-router-dom';
import Avatar from '../../atoms/Avatar/Avatar';
import styles from './Topbar.module.css';

const NAV_LINKS = [
  { path: '/', label: 'Início' },
  { path: '/clientes', label: 'Clientes' },
  { path: '/boletos', label: 'Boletos' },
];

function Topbar() {
  const { pathname } = useLocation();

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          cobran<em>ça</em>s
        </Link>
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={[
                styles.navLink,
                pathname === link.path ? styles.active : '',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className={styles.right}>
        <span className={styles.version}>Sistema de Cobranças v1.0</span>
        <Avatar size="sm" color="dark" />
      </div>
    </header>
  );
}

export default Topbar;
