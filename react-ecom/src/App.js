import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  // const [x,setX]=useState(50)

  const sayHello=()=>{
    alert("hello , how are you?")
  }


  return (
  <div className='container'>
    <h1>This is root element</h1>

    <Home myFun={sayHello} title="Learn Javascript" description="We are learning javascript" buttonName="Subscribe" />

    <Home  myFun={sayHello} title="Learn ReactJs" description="We are learning ReactJs with Project" buttonName="Like" />

    <Home  myFun={sayHello} title="Learn Angular" description="We are learning Angular with project" buttonName="Like and Subscribe" />

    <Home   myFun={sayHello} />

    <Home  myFun={sayHello} title="Learn Code With Durgesh" description="This channel provides content related to programming and coding" buttonName="Share and Subscribe" />
   
  </div>
  );
}

export default App;
