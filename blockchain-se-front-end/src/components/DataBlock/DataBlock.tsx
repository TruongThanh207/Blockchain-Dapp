import React from "react";
import styles from './DataBlock.module.scss'
import {Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface IDataBlock {
  id: string;
  icon?: IconProp;
  title?: string;
  btnTitle?: string;
  subTitle?: string;
  onClick?: (type: string) => void;
}

const DataBlock: React.FC<IDataBlock> = props => {

  let handleClickAction = () => {
    props.onClick && props.onClick(props.id);
  }

  return (
      <div className={styles['data-block-container']}>
        <section>
          <span className={styles['icon-container']}>
            <FontAwesomeIcon icon={props.icon!}/>
          </span>
          <h3>
            {props.title}
          </h3>
          <p>
            {props.subTitle}
          </p>
          <Button type="default" size={'large'} onClick={handleClickAction} className={styles['btn-action']}>
            {props.btnTitle}
          </Button>
        </section>
      </div>
  )
}
export default DataBlock;