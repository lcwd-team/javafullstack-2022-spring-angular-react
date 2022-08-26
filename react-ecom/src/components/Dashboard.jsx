import React, { useEffect, useState } from 'react'
import { getCurrentUser, logout } from '../auth'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Base from './Base'
function Dashboard() {

  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const logoutUser = () => {
    logout(() => {
      navigate("/")
    })
  }

  return (
    <Base>
      <>
        <div>This is dashboard component</div>
        {user && (
          <div>
            <h1>Login user is  {user.email}  {user.name}</h1>
            <Button onClick={logoutUser} color="success">Logout</Button>
          </div>
        )}
      </>
    </Base>
  )
}

export default Dashboard