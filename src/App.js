

import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Routing, Route, Switch} from 'react-router-dom'
import login from './components/signIn/signIn';
import registration from './components/signUp/signup';
import ForgetPassword from "../src/Pages/ForgetPassword";
import Resetpassword from "../src/Pages/resetPasword/Resetpassword"
function App() {
  return (
    <Routing>
     <div className="App">
        <Switch>
          <Route path="/" exact component={login}></Route>
          <Route path="/registration" component={registration}></Route>
          <Route path="/login"  component={login}></Route>
          <Route path="/forgotPassword" component={ForgetPassword}></Route>
          <Route path="/resetpassword" component={Resetpassword}></Route>
        </Switch>
     </div>
    </Routing>
  );
}

export default App;