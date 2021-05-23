import React from "react";
import {Button, Form, Input, Modal} from "antd";
import styles from './LoginModal.module.scss';

interface ILoginModalProps {
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
  wrapperCol: {offset: 16, span: 16},
};

const LoginModal: React.FC<ILoginModalProps> = props => {

  let handleOk = (value: any) => {
    props.onOK(value);
  }

  let handleCancel = () => {
    props.onCancel();
  }

  return (
      <Modal
          title={'Log in'}
          okText={'Log in'}
          cancelText={'Cancel'}
          centered
          confirmLoading={props.loading}
          visible={props.visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
      >
        <div className={styles['login-container']}>
          <Form
              {...layout}
              name="basic"
              initialValues={{remember: true}}
              onFinish={handleOk}
          >
            {/* <Form.Item
                label="Address"
                // labelCol={{className: 'text-center'}}
                name="address"
                rules={[{required: true, message: 'Please input!'}]}
            >
              <Input type={'text'}/>
            </Form.Item> */}

            <Form.Item
                label="Email"
                // labelCol={{className: 'text-center'}}
                name="email"
                rules={[{required: true, message: 'Please input email!'}]}
            >
              <Input type={'text'}/>
            </Form.Item>

            <Form.Item
                label="Password"
                // labelCol={{className: 'text-center'}}
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
  )
}
export default LoginModal;