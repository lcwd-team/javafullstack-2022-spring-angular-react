
import React, { useState } from 'react'
import {

  Container,
  Row,
  Col,
  Card, CardBody, CardTitle, Form, Input, Label, FormGroup,
  Button

} from 'reactstrap'
import { createUser } from '../services/user-service';
import { toast } from 'react-toastify'
import Base from './Base';
function Signup() {



  // const [name, setName] = useState('')

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
    address: '',
    phone: '',
    gender: ''
  })

  const onFieldChange = (event, fieldName) => {
    // console.log(event.target.value);
    setUser({ ...user, [fieldName]: event.target.value })

  }


  const registerUser = (event => {
    event.preventDefault()

    console.log(event)

    if (user.name.trim() === '') {
      toast.error("Username is required !!")
      return
    }

    if (user.email.trim() === '') {
      toast.error("Email is required !!")
      return;
    }

    //submit the form
    createUser(user).then((data) => {
      console.log(data)
      //alert("user registered successfully !!")
      toast.success("user registered successfully")
    }).catch(error => {
      if (error.response.status == 400) {
        // alert("validation error")
        var messages = ``
        for (let i in error.response.data) {

          messages = messages + ` ${i.toUpperCase()}  ${error.response.data[i]}  \n`

        }
        messages = messages + ""
        toast.error(messages);
      } else {
        // alert("server error")
        toast.error("server error")
      }
      console.log(error)
    })

  })


  return (
    <Base>

      <Container>

        <Row>

          <Col md={{ size: 6, offset: 3 }}>


            <Card className='border-0 mt-3 shadow-sm'>

              <CardBody>
                <h3>Singup here </h3>
                <CardTitle>Fill fill the correct details</CardTitle>

                {/* 
        {JSON.stringify(user)} */}


                <Form onSubmit={registerUser}>

                  {/* name field  */}
                  <div className='mb-2 mt-4'>
                    <Label for="name" >Name</Label>
                    <Input
                      type="text"
                      id='name'
                      placeholder='Enter here'
                      onChange={(event) => onFieldChange(event, 'name')}
                      value={user.name}

                    />

                  </div>
                  {/* email field  */}
                  <div className='mb-2 '>
                    <Label for="email" >Email </Label>
                    <Input
                      type="email"
                      id='email'
                      placeholder='Enter here'
                      onChange={(event) => onFieldChange(event, 'email')}
                      value={user.email}
                    />

                  </div>
                  {/* password field  */}
                  <div className='mb-2 '>
                    <Label for="password" >New Password </Label>
                    <Input
                      type="password"
                      id='password'
                      placeholder='Enter here'
                      onChange={(event) => onFieldChange(event, 'password')}
                      value={user.password}

                    />

                  </div>
                  {/* about field  */}
                  <div className='mb-2 '>
                    <Label for="about" >Something about yourself </Label>
                    <Input
                      type="textarea"
                      id='about'
                      placeholder='Enter here'
                      onChange={(event) => onFieldChange(event, 'about')}
                      value={user.about}

                    />

                  </div>
                  {/* address field  */}
                  <div className='mb-2 '>
                    <Label for="address" >Your address </Label>
                    <Input
                      type="textarea"
                      id='address'
                      placeholder='Enter here'
                      onChange={(event) => onFieldChange(event, 'address')}
                      value={user.address}

                    />

                  </div>


                  {/* gender field  */}

                  <FormGroup>

                    <Input
                      type='radio' name='gender'
                      checked={user.gender == 'male'}
                      onChange={(event) => onFieldChange(event, 'gender')}
                      value={'male'}

                    />
                    {' '}
                    <Label>Male</Label>



                    <Input type='radio' className='ms-3' name='gender'
                      checked={user.gender == 'female'}
                      onChange={(event) => onFieldChange(event, 'gender')}
                      value={'female'}
                    />
                    {' '}
                    <Label>Female</Label>

                  </FormGroup>


                  {/* phone field  */}
                  <div className='mb-2 '>
                    <Label for="phone" > Phone number </Label>
                    <Input
                      type="number"
                      id='phone'
                      placeholder='Enter here'
                      onChange={(event) => onFieldChange(event, 'phone')}
                      value={user.phone}
                    />

                  </div>


                  <Container className='mt-2 text-center'>
                    <Button color='primary'>Register</Button>
                    <Button color='danger ms-2'>Reset Data</Button>
                  </Container>

                </Form>

              </CardBody>

            </Card>



          </Col>


        </Row>


      </Container>

    </Base>
  )
}

export default Signup