import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import MH from "./pages/MH";
import Appointment from "./pages/Appointment";
import Patient from "./pages/Patient";
import Admin from "./pages/Admin";
import NoMatch from "./pages/NoMatch";
import Admin_Report from "./pages/Admin_Report";
import Admin_Episode from "./pages/Admin_Episode";
import userAPI from "./utils/userAPI";
import mailerAPI from "./utils/nodemailerAPI";
import openSocket from 'socket.io-client';

import "./App.css";


import {
  Label,
  Alert
} from 'reactstrap';

import background from "./med_b.ground.jpg";


const socket = openSocket();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      role: "",
      email: "",
      messageCenter: "",
      messageStatus: "",
      alertIncident : [],
    }
    this.getBackMessage = this.getBackMessage.bind(this);
    this.getBackMessageStatus = this.getBackMessageStatus.bind(this);
    this.getBackAlertIncident = this.getBackAlertIncident.bind(this);
    
    socket.on("alertAdmin", message =>{
        const newAlertIncident = this.state.alertIncident;
        newAlertIncident.push(message);
        console.log(newAlertIncident);
        this.setState({
            alertIncident : newAlertIncident
        })
        console.log(this.state.alertIncident);
    })



  }
  getBackMessage(messageCenter){
    console.log("here getting back message")
    this.setState({
      messageCenter : messageCenter
    },function(){
      if(this.state.messageCenter){
      
      setTimeout( () => {
        this.setState({
          messageCenter : null,
          messageStatus : null
        })
      },5000)
    }
    })
    
  }

  getBackMessageStatus(messageStatus){
    this.setState({
      messageStatus : messageStatus
    })
  }

  getBackAlertIncident(alertIncident){
    console.log("getting back alert incident");
    this.setState({
      alertIncident : alertIncident
    })
    console.log("Alert incident : " , this.state.alertIncident);
  }
  removeMessage = () =>{
    this.setState({
      messageCenter : null,
      messageStatus : null      
    })
  }

  PrivatePatientRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest} render={(props) => (
      console.log(localStorage.getItem("role")),
      localStorage.getItem("role")!== null && localStorage.getItem("role").toLowerCase() === "patient"
        ? (
          localStorage.removeItem("messageCenter"),
          localStorage.removeItem("messageStatus"),
          <Component {...props} test='hi there' getBackAlertIncident = {this.getBackAlertIncident} handleIncident = {this.handleIncident} getBackMessage={this.getBackMessage} getBackMessageStatus={this.getBackMessageStatus}/>
        )
        : (
          localStorage.setItem("messageCenter", "You do not have the proper credential to access that page."),
          localStorage.setItem("messageStatus", "danger"),
          this.setState({
            messageCenter: "You do not have the proper credential to access that page.",
            messageStatus: "danger"
          }),
          <Redirect to={{
            pathname: '/notfound'
          }} />
        )
    )} />
  )
  PrivateAdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("role")!== null && (localStorage.getItem("role").toLowerCase() === "doctor" || localStorage.getItem("role").toLowerCase() === "admin")
        ? <Component {...props} alertIncident={this.state.alertIncident} getBackMessage={this.getBackMessage} getBackMessageStatus={this.getBackMessageStatus} />
        : (
          localStorage.setItem("messageCenter", "You do not have the proper credential to access that page."),
          localStorage.setItem("messageStatus", "danger"),
          this.setState({
            messageCenter: "You stumble upon a page where you do not have access to...",
            messageStatus: "danger"
          }),
          <Redirect to={{
            pathname: '/notfound'
          }} />
        )
    )} />
  )
  
  componentDidMount(){
    userAPI.isLoggedIn().then( res => {
      console.log(res);
      if(res.user){
        localStorage.setItem("username", res.user.username);
        localStorage.setItem("role", res.user.role);
        localStorage.setItem("email", res.user.email);
        this.setState({
          username: res.user.username, 
          role: res.user.role,
          email: res.user.email});
      }
      console.log(this.state);
    })
    .catch(err => {
      console.log(err.response);
      localStorage.clear()
      this.setState({
        username: "",
        role: "",
        email : "",
        messageCenter : "",
        messageStatus : "",
      })
    })
  }
  
  handleIncident =  (emergencies, patientNumber) => {
      console.log("socket io fired");
      //get rid of the dangling comma
      emergencies = emergencies.slice(0,-1);
      socket.emit('alertAdmin', {'name' : localStorage.getItem("firstName") +  " " + localStorage.getItem("lastName"),
                                  'hospitalNum' : patientNumber,
                                  'emergencies' : emergencies,
                                  'date' : Date.now()
                                });
      //send email to doctor
      mailerAPI.sendToDoctor({
                    name : this.state.username,
                    subject : `MedMonitor : Urgent incident from  ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`,
                    email : this.state.newAccountEmail,
                    message : `
                              Your patient ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")} has reported risky emergencies ${emergencies}! 
                              Please log on to the application to review the patient information and schedule the earliest possible appointment for him.
                              From
                              Team MedMonitor`
                })
                .then(res =>{
                    console.log(res);
                    console.log("mail man work real hard!");
                })
                .catch(err => {
                    console.log(err);
                });
  }

  render(){
  return(
  <Router>

      <div> 
      <div className='backgroundContain' style={{ backgroundImage: `url(${background})`}} />
  
      <Header username = {this.state.username} role={this.state.role} />
        {this.state.messageCenter ? <Alert color={this.state.messageStatus} className="msg-center text-center animation">
          {this.state.messageCenter}  <Label onClick={() => this.removeMessage()} style={{float: "right"}}>x</Label>
        </Alert> : null }
      

      <Switch>
        <Route exact path="/" render={props => <Home getBackMessage={this.getBackMessage} getBackMessageStatus={this.getBackMessageStatus}> </Home>} />
        <Route exact path="/home" render={props => <Home getBackMessage={this.getBackMessage} getBackMessageStatus={this.getBackMessageStatus}> </Home>} />
        <Route exact path="/mh" component={MH} />
        <this.PrivatePatientRoute exact path="/patient" component={Patient} />
        <this.PrivateAdminRoute exact path="/admin" component={Admin} />
        <this.PrivateAdminRoute exact path="/admin/report" component={Admin_Report} />
        <this.PrivateAdminRoute exact path="/admin/episode" component={Admin_Episode} />
        <this.PrivatePatientRoute exact path="/appointment" component={Appointment} />
        <Route exact path="/notfound" component={NoMatch} />
        <Route component={NoMatch} />
      </Switch>
        
    </div>
  </Router>
  )
  }
}

export default App;