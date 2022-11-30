import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        <div className={styles.user}>
          <Link to="/user/:userId">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9042/9042167.png"
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span>Harsh</span>
        </div>

        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/Login">Log in</Link>
            </li>
            <li>
              <Link to="/">Log out</Link>
            </li>
            <li>
              <Link to="/Sign-up">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
