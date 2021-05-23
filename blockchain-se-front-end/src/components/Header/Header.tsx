import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import styles from './Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainNav from "../MainNav/MainNav";
import AppContext from "../../context/AppContext";
import { useHistory } from "react-router";


const Header: React.FC<any> = props => {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const appContext = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    setIsAuthorized(appContext.isAuthorized!);
  }, [appContext])

  let handleLogOut = () => {
    localStorage.clear();
    appContext.setIsAuthorized && appContext.setIsAuthorized(false);
    history.push('/login')
  }

  return (
    <header className={styles['custom-header']}>
      <Row>
        <Col span={12}>
          <a href={'/'}>
            <img src={'https://ui-avatars.com/api/?name=CDB'} alt="" style={{ marginBottom: '1rem' }} />
          </a>
        </Col>
        <Col span={12}>
          <div className={styles['info']}>
            <Button type="default" size={'large'}>
              <FontAwesomeIcon icon={'chevron-left'} className={styles['mr-5px']} />
              back to ETHChain explore
            </Button>
          </div>
          {
            isAuthorized && (
              <div className={styles['logout']}>
                <a onClick={handleLogOut}>
                  Log out
                </a>
              </div>
            )
          }
        </Col>
      </Row>
      <Row>
        <MainNav isAuthorized={isAuthorized} />
      </Row>
    </header>
  )
}
export default Header;