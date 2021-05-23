import React from "react";
import styles from "../Login/LoginModal/LoginModal.module.scss";
import {Button, Form, Input, Modal} from "antd";

interface ICreateWalletModalProps {
  onOK: (value: any) => void;
  onCancel: () => void;
  visible: boolean;
  loading?: boolean
}

const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 18, span: 6},
};


const CreateWalletModal: React.FC<ICreateWalletModalProps> = props => {

  let handleOk = (value: any) => {
    props.onOK(value);
  }

  let handleCancel = () => {
    props.onCancel();
  }

  return (
      <Modal
          title={'Create wallet'}
          okText={'Create wallet'}
          cancelText={'Cancel'}
          centered
          confirmLoading={props.loading}
          visible={props.visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
      >
        <div className={styles['create-container']}>
          <Form
              {...layout}
              name="basic"
              initialValues={{remember: true}}
              onFinish={handleOk}
          >
            <Form.Item
                label="Email"
                // labelCol={{className: 'text-center'}}
                name="email"
                rules={[{required: true, message: 'Please input your email!'}]}
            >
              <Input type={'email'}/>
            </Form.Item>

            <Form.Item
                label="Password"
                // labelCol={{className: 'text-center'}}
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item
                label="Verify Password"
                // labelCol={{className: 'text-center'}}
                name="verify"
                rules={[{required: true, message: 'Please input your verify password!'}, ({getFieldValue}) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Verified password does not match!'));
                  },
                })]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Create wallet
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
  )
}

export default CreateWalletModal;