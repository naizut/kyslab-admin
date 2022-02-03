import { FC } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserService } from '../../api/admin/user'

import './Login.less'


import { useNavigate, useLocation } from 'react-router-dom'

const Login: FC = () => {
  let navigate = useNavigate()
  let location = useLocation()

  const onFinish = async (values: any) => {
    const res = await UserService.login({
      username: values.username,
      password: values.password
    })
    
    if(res.code === 200) {
      window.localStorage.setItem("ka-access-token", res.result)
      navigate(-1)
    }    
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="page-login">
      <div className="form-login">
        <Form
          name="basic"
          labelCol={{ span: 6}}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 18 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
