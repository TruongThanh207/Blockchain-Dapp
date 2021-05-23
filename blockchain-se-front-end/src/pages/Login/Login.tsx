import { Col, Row } from "antd";
import { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import { store } from 'react-notifications-component';
import { useHistory } from "react-router";
import { throwError } from "rxjs";
import { catchError, delay, map } from "rxjs/operators";
import { AccountApi } from '../../api/services/account.api';
import { AuthApi } from "../../api/services/auth.api";
import DataBlock from "../../components/DataBlock/DataBlock";
import Loading from "../../components/Loading/Loading";
import AppContext from "../../context/AppContext";
import CreateWalletModal from "../CreateWalletModal/CreateWalletModal";
import styles from './Login.module.scss';
import LoginModal from "./LoginModal/LoginModal";


const Login: React.FC<any> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const appContext = useContext(AppContext);
  const history = useHistory();

  let handleOpenModal = (type: string) => {
    setType(type);
    setIsModalVisible(true);
  }

  let handleOK = (value: any, type: string) => {
    appContext.setLoading && appContext.setLoading(true);

    setLoading(true);
    if (type === 'login') {
      // AuthApi.loginWithAddress(value.address).pipe(
      //   delay(1000),
      //   map(res => res.data),
      //   catchError((err: AxiosError) => {
      //     return throwError(err.response?.data.message)
      //   })
      AuthApi.login({ email: value.email, password: value.password }).pipe(
        delay(1000),
        map(res => res.data),
        catchError((err: AxiosError) => {
          return throwError(err.response?.data.message)
        })
      ).subscribe(
        data => {
          if (!data.payload.code) {
            setIsModalVisible(false);
            appContext.setIsAuthorized && appContext.setIsAuthorized(true);
            localStorage.setItem('token', data.payload.access_token);
            localStorage.setItem('address', data.payload.address);
            history.push('/transaction');
            notification('success', 'Success !!', 'Log in successfully');
          } else {
            notification('danger', 'Error !!', data.payload.error);
          }
          appContext.setLoading && appContext.setLoading(false);
          setLoading(false);
        },
        error => {
          notification('danger', 'Error !!', error.payload.error);
          setLoading(false)
        }
      )
    } else {
      AccountApi.register({ email: value.email, password: value.password }).pipe(
        delay(1000),
        map(res => res.data),
        catchError((err: AxiosError) => {
          return throwError(err.response?.data.message)
        })
      ).subscribe(
        data => {
          if (!data.payload.code) {
            setIsModalVisible(false);
            history.push('/transaction')
            notification('success', 'Success !!', 'Register successfully');

          } else {
            notification('danger', 'Error !!', data.payload.error);
          }
          setLoading(false)
          appContext.setLoading && appContext.setLoading(false);

        },
        error => {
          notification('danger', 'Error !!', error.payload.error);
          setLoading(false);
        }
      )
    }
  }

  let handleCancel = () => {
    setIsModalVisible(false)
  }

  let notification = (type: any, title: string, message: string) => {
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  }

  return (
    <>
      <div style={{ backgroundColor: '#ECF0F1' }}>
        <Row gutter={12} className={styles['justify-content-around']}>
          <Col className="gutter-row" span={8}>
            <DataBlock id={'new'} title={'New account'} subTitle={'Need a new account?'} icon={'user'}
              onClick={handleOpenModal} btnTitle={'Create Account'} />
          </Col>
          <Col className="gutter-row" span={8}>
            <DataBlock id={'exist'} title={'Existing Account'} subTitle={'Already have a account?'} icon={'unlock'}
              onClick={handleOpenModal} btnTitle={'Log in'} />
          </Col>
          <Col className="gutter-row" span={8} />
        </Row>
      </div>
      {loading && <Loading />}
      {type === 'exist' && isModalVisible && (
        <LoginModal visible={isModalVisible} onOK={(value) => handleOK(value, 'login')} onCancel={handleCancel} />
      )}
      {type === 'new' && isModalVisible && (
        <CreateWalletModal visible={isModalVisible} onOK={(value) => handleOK(value, 'new')}
          onCancel={handleCancel} />
      )}
    </>
  )

}
export default Login;