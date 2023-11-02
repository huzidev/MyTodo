import { CheckCircleOutlined } from '@ant-design/icons';
import { Spin, Typography, notification } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signoutUser } from '../../../store/form/Signout/signoutSlice';
import { useAppDispatch } from '../../../store/hooks/hooks';

export default function SignOut(): JSX.Element {
  const dispatch = useAppDispatch()
  const Navigate = useNavigate();

  async function openNotification() {
    notification.open({
      icon: <CheckCircleOutlined style={{ color: '#00FF00' }} />,
      message: "Logout Successfully"
    });
  };

  React.useEffect(() => {
    dispatch(signoutUser())
    localStorage.removeItem('jwtoken')
    setTimeout(() => {
      Navigate('/', {
        replace: true
      })
      { openNotification() }
    }, 2000)
  }, [])

  return (
    <div style={{ width: '300px', margin: '20% auto' }}>
      <Typography.Title level={1}>
        Logging Out <Spin size='large' />
      </Typography.Title>
    </div>
  )
}
