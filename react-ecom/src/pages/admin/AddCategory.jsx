import React, {useState} from 'react'
import {Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {addCategory} from "../../services/category-serivce";
import {toast} from "react-toastify";


function AddCategory() {

    const [title, setTitle] = useState('')

    function submitForm(event) {
        event.preventDefault()

        addCategory({title}).then(res => {
            console.log(res)
            toast.success("Category Added")
        })
            .catch(error => {
                console.log(error)
                toast.error("error in adding categories")
            })

    }


    function addCategoryForm() {


        return (<>
            <Row>

                <Col>

                    <h3>Add Category</h3>


                    <Form  onSubmit={submitForm}>

                        <FormGroup>
                            <Label>Category Title</Label>
                            <Input
                                placeholder={'Enter here'} type={"textarea"} height={250}
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </FormGroup>

                        <Container className={'text-center'}>
                            <Button type={"submit"} color={'success'}>Add Category</Button>
                        </Container>

                    </Form>

                </Col>
            </Row>
        </>)
    }

    return (

        <Container>
            <Card>
                <CardBody>
                    {addCategoryForm()}
                </CardBody>
            </Card>
        </Container>)
}

export default AddCategory