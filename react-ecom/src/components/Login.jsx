import React from 'react'
import { 
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  Label,
  Button
} from 'reactstrap'

function Login() {
  return (
   
    <Container>


      <Row>

        <Col md={{
          size:6,
          offset:3
        }}>
        
        <Card  className='shadow-sm mt-5'>

        <CardBody>


           <h3>Login here</h3>

           <form>

            <div className='my-3'>
              <Label for="username" >Usernamne</Label>
              <Input  className='rounded-0' id='username' placeholder='Enter your username'/>
            </div>
            <div className='mb-3'>
              <Label for="password" >Password</Label>
              <Input  className='rounded-0' id='password' placeholder='Enter your password'/>
            </div>

            <Container className='text-center'>
              <Button block color='primary' className='rounded-0'>Login</Button>
              <Button  block  color='warning' className='mt-2 rounded-0'>Rest</Button>
            </Container>

           </form>

        </CardBody>

        </Card>
        
        
        </Col>

      </Row>


    </Container>


  )
}

export default Login