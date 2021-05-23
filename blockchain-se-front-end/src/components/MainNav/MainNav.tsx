import React, { useCallback, useEffect, useMemo } from "react";
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import styles from './MainNav.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainNav: React.FC<{ isAuthorized: boolean }> = props => {

  const history = useHistory();

  const activeClass = useCallback((path: string) => path === history.location.pathname, [history]);

  useEffect(() => {
    console.log('LOG ~ file: MainNav.tsx ~ line 9 ~ history', history)
  }, [history])

  return (
    <div style={{ height: 50 }}>
      <nav className={styles['tab-header']}>
        <ul className={styles['nav-list']}>
          <li className={activeClass('/') ? styles['active'] : ''}>
            <NavLink to="/">
              <span>
                <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'user' }} />
              </span>
              My wallet
            </NavLink>
          </li>
          <li className={activeClass('/transaction') ? styles['active'] : ''}>
            <NavLink to="/transaction" activeClassName='active'>
              <span>
                <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'list-alt' }} />
              </span>
              Transaction
            </NavLink>
          </li>
          {
            !props.isAuthorized && (
              <li className={activeClass('/login') ? styles['active'] : ''}>
                <NavLink to="/login">
                  <span>
                    <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'list-alt' }} />
                  </span>
                  Login
                </NavLink>
              </li>
            )
          }
          {/* {
            !props.isAuthorized && (
              <li className={activeClass('/verify') ? styles['active'] : ''}>
                <NavLink to="/verify">
                  <span>
                    <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'book' }} />
                  </span>
                  Verify
                </NavLink>
              </li>
            )
          } */}
          {/* <li className={activeClass('#') ? styles['active'] : ''}>
            <a href="#">
              <span>
                <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'wrench' }} />
              </span>
              Receive
            </a>
          </li>
          <li className={activeClass('#') ? styles['active'] : ''}>
            <a href="#">
              <span>
                <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'user' }} />
              </span>
              Import / Export
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  )
}
export default MainNav;