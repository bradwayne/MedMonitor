import React, { Component } from 'react';
import {
    Container, Row, Col, 
    Button, 
    Card, CardBody, CardTitle, CardText,
    Form, FormGroup, Label, Input, FormText,
} from 'reactstrap';
import FormGroup3_9Name from "../FormGroup/formGroup3_9Name";
import FormGroup3_9Input from "../FormGroup/formGroup3_9Input";
import FormGroup3_9Contact from "../FormGroup/formGroup3_9Contact";
import './changeAppointmentCard.css';


export default class ChangeAppointmentCard extends React.Component {


    //YYYY-MM-DDTHH:mm:ss.sssZ
    //this.setState({newAppt: `${this.state.newApptDate}T${this.state.newApptTime}.000Z`})
    onClicked(id) {
       this.props.updateAppointment(id)
    }


    onChanged(event) {
        this.props.handleInputChange(event)
    }


    render () {
        return (

            <Card style={{display: this.props.changeAppointmentCard ? "block" : "none"}}>
                <CardBody style={{minHeight: 550}}>
                    <CardTitle style={{backgroundColor: "#eeeeee", padding: 6}}>Update patient details </CardTitle>
                        <br />
                        <Form>

                            <FormGroup row>
                                <Label sm={3}>Hospital number</Label>
                                <Label sm={9}>{this.props.patientNumber}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Name</Label>
                                <Label sm={9}>{this.props.firstname} {this.props.lastname}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Enrollment Status</Label>
                                <Label sm={9}>{this.props.active ? "Active" : "Currently inactive"}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Next appointment currently on: </Label>
                                <Label sm={9}>{this.props.nextAppt}</Label>
                            </FormGroup>

                            <FormGroup3_9Input
                                type="date"
                                label = {"New appointment date: "}
                                placeholder = {this.props.nextAppt}
                                nameDate = {"pt_newApptDate"}
                                onChanged = {(event) => this.onChanged(event)}
                            />  
                            
                            <FormGroup3_9Input
                                type="time"
                                label = {"New appointment time: "}
                                placeholder = {this.props.nextAppt}
                                nameTime = {"pt_newApptTime"}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <br />
                            <Button style={{marginRight: 6}} onClick={() => this.onClicked(this.props.pt_id)}>Update</Button>
                            <a href="/admin"><Button style={{marginRight: 6}}>Cancel</Button></a>
                        </Form>
                    
                </CardBody>
            </Card>

        )
    }
}           