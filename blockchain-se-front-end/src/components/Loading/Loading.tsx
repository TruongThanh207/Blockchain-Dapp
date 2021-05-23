import React from "react";
import styles from './Loading.module.scss';
import ReactLoading from "react-loading";

const Loading: React.FC<any> = props => {
  return (
      <div className={styles['loading-container']}>
        <div className={styles['backdrop']}>
          <ReactLoading type={'bars'} color={'#000'} className={styles['loading']}/>
        </div>
      </div>
  )
}
export default Loading;