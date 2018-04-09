import React, { Component } from "react";
import PatSurvey from "../../components/PatSurvey";
import PatMedDue from "../../components/PatMedDue";
import VideoUpload from "../../components/VideoUpload";
import patientAPI from "../../utils/patientAPI";

import './Patient.css';

import {
    Button,
    Container,
    Row,
    Col,
} from 'reactstrap';


class Patient extends Component {
    constructor(props){
        super(props);
        console.log(props.test);
        this.state = {
            finishedQuestion : false,
            next_appt : '',
            medication : [],
            details : {}
        }

    }
    componentDidMount() {
        console.log("user id : " + localStorage.getItem("userId"));
        if(localStorage.getItem("userId")){
            patientAPI.findPatientInfoForPatient(localStorage.getItem("userId").toString())
                .then(res => {
                    console.log("data for patient: ", res.data)
                    this.setState({
                        next_appt: `${res.data.appointment.next_appt}`,
                        medication: res.data.episode[0].medications,
                        details: res.data.details
                    })
                    console.log(this.state);
                })
                .catch(err => console.log(err));
        }
    }
    handleFinishedCallback= () => {
        this.setState({
            finishedQuestion : true
        })
        console.log(this.state.finishedQuestion)
    }
    render(){
        return (
            <Container fluid>
                <Container>
                    <Row>
                        <Col size='md-12'>
                            <PatSurvey 
                                handleIncident={this.props.handleIncident} 
                                handleFinishedCallback={this.handleFinishedCallback} 
                                getBackMessageStatus = {this.props.getBackMessageStatus}
                                getBackMessage={this.props.getBackMessage}
                            />
                        </Col>
                    </Row>
                    {
                        this.state.finishedQuestion === false ?
                            <Row>
                                <Col size='md-6'>
                                    <PatMedDue 
                                        medication={this.state.medication} 
                                        getBackMessageStatus = {this.props.getBackMessageStatus}
                                        getBackMessage={this.props.getBackMessage} 
                                    />
                                </Col>
                                <Col size='md-6'>
                                    <VideoUpload 
                                        getBackMessage={this.props.getBackMessage} 
                                        getBackMessageStatus = {this.props.getBackMessageStatus}
                                    />
                                </Col>
                            </Row>
                        :
                        null
                    }
                </Container>
            </Container>
        )
    }
}

export default Patient;


