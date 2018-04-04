import React, { Component } from 'react';
import DatetimePicker from 'react-datetime';
import {
    Nav, Navbar, NavItem, NavLink, 
    Form, FormGroup, Label, Input, FormText,
    Button, 
    ListGroup, ListGroupItem,
    Container, Row, Col, 
    Card, CardBody, CardTitle, CardSubtitle, CardText,
    Table
} from 'reactstrap';
import './PatientNextAppointment.css';
import { Value } from 'react-select';

export default class PatientNextAppointment extends React.Component {
    state = {
        next_appt : '',
        comments : ''
    }
    handleSubmit = () =>{
        this.props.handleApptCallback(this.state);
        this.props.confirmNewEpisodeDetails();
    }
    handleDate = (date) => {
        this.setState({ next_appt : date._d }, () => console.log(this.state.next_appt));
    };
    // Form handlers
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(event.target.value);
    };

    render () {
        return (
            <Card style={{display: this.props.addNextAppointmentCard ? "block" : "none"}}>
                <CardBody style={{minHeight: 550}}>
                    <CardTitle style={{backgroundColor: "#eeeeee", padding: 6}}>Enter next appointment</CardTitle>
                
                    <CardText>
                        Enter the time of this patients next appointment and any comments for the patient to view.
                    </CardText>
                    <Container>
                        <DatetimePicker 
                            onChange={this.handleDate}
                        />
                    </Container>
                    <Label>
                        Notes for patient:
                    </Label>
                    <Input type="text" name='comments' onChange={this.handleInputChange} placeholder='write notes to patient here' />
                    <Button style={{marginRight: 6}} onClick={() => this.handleSubmit()}>Here Next</Button>
                    <a href={"/admin"}> <Button style={{marginRight: 6}}>Cancel</Button></a> 
                    
                </CardBody>
            </Card>
        )
    }
}