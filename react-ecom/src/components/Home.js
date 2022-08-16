import { Button, Card, CardBody, CardFooter } from "reactstrap";

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
    <div style={{marginTop:'20px'}}>
      <Card>

        <CardBody>

            <h3>{ title}</h3>
            <p>{description}</p>

        </CardBody>

        <CardFooter>
            <Button color="info">{buttonName}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
