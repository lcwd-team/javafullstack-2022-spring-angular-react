import { Container, Row, Col, Button, Card, CardBody, CardFooter } from "reactstrap";
import Base from "./Base";

const Home = ({
  title = "Default Title",
  description = "Default Description",
  buttonName = "Default ButtonName",
  myFun,
}) => {
  let styleOb = {
    padding: "20px",
    background: "#e2e2e2",
    border: "1px solid red",
    margin: "10px",
  };

  return (


    <Base>

      <div className="banner">
        <Container >

          <Row className="py-5">
            <Col>


              <h1 className="text-center" style={{
                fontWeight: 1000,
                textTransform: 'uppercase'
              }}>Welcome to MyShop</h1>
              <p className="text-center">This is standard shop created by java people , so that every one can buy things very easily.</p>


              <Container className="text-center">
                <Button className="rounded-0" size="lg" color="primary">Go to Store</Button>
              </Container>
            </Col>
          </Row>

        </Container>
      </div>

    </Base>


  );
};

export default Home;
