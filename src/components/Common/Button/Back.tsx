import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

const Back: FC = () => {
  let navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <Button onClick={handleClick} style={{marginBottom: '20px'}}>
      <LeftOutlined />
      Back
    </Button>
  )
}

export default Back
