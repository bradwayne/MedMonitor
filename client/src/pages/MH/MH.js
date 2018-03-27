import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import medicationAPI from "../../utils/medicationAPI";
import doctorAPI from "../../utils/doctorAPI";
import patientAPI from "../../utils/patientAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



class Books extends Component {
    state = {
    id: "5ab9ca8deeb04b6754f900bf"
    };

    componentDidMount() {
        this.loadAllDoctors();
    }


    // -----------------------
    // Medications route tests
    // -----------------------

    // load all drugs
    loadAllDrugs = () => {
        medicationAPI.findAll({})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // add a new drug
    addNewDrug = event => {
        event.preventDefault();
        medicationAPI.newDrug({
            name: "Sinemet",
            type: "dopamine agonist",
            doses: {
                dose: "10/150mg",
                form: "tablet",
                route: "oral"
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // delete a drug
    deleteDrug = event => {
        event.preventDefault();
        medicationAPI.deleteMedication(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // add new dose to existing medication
    addNewDose = event => {
        event.preventDefault();
        medicationAPI.newDose(this.state.id, {
            dose: "100/10mg",
            form: "tablet",
            route: "oral"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

    };


    // delete a dose from existing medication
    // note dose object must exactly match the dose object to be deleted fromt the document
    deleteDose = event => {
        event.preventDefault();
        medicationAPI.deleteDose(this.state.id, {
            dose: "100/10mg",
            form: "tablet",
            route: "oral"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // --------------------
    // Doctor routes tests
    // --------------------

    // load all doctors
    loadAllDoctors = () => {
        doctorAPI.findAll({})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // find doctor by id
    findDoctor = event => {
        event.preventDefault();
        doctorAPI.findOne(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // Delete doctor by id
    deleteDoctor = event => {
        event.preventDefault();
        doctorAPI.remove(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // add a new doctor
    addNewDoctor = event => {
        event.preventDefault();
        doctorAPI.create({
            name: {
                first: "Peter",
                last: "Willis",
            },
            office: "Clevealnd Clinic, Downtown plaza 1",
            email: "peter@thegreat.com",
            phone: "254-456-8254"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // update a doctors details 
    updateDoctor = event => {
        event.preventDefault();
        doctorAPI.update(this.state.id, {
            name: {
                first: "General",
                last: "Mo",
            },
            office: "UH, Downtown  1",
            email: "Mo@mo.com",
            phone: "254-456-11111"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // ------------------------
    // Patient_data route tests
    // ------------------------

    // load personal details of all patients (alphabetical by last name) ^^
    loadAllPatients = () => {
        patientAPI.findAll({})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // find patient data by id for Admin ^^
    findPatientInfoForAdmin = event => {
        event.preventDefault();
        patientAPI.findPatientInfoForAdmin(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // find patient data by id for Patient use ^^
    findPatientInfoForPatient = event => {
        event.preventDefault();
        patientAPI.findPatientInfoForPatient(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // fetch patient medications ^^
    findPatientMeds = event => {
        event.preventDefault();
        patientAPI.findPatientMeds(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // make patient inactive (leaves care of doctor) ^^
    recordPatientInactive = event => {
        event.preventDefault();
        patientAPI.inactivatePatient(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // update patient details (email and phone) ^^
    updatePatientContactDetails = event => {
        event.preventDefault();
        patientAPI.updateContact(this.state.id, {
            email: "patientemail@patient.com",
            phone: "123-456-7890"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // update next appointment
    updatePatientAppointment = event => {
        event.preventDefault();
        patientAPI.updateAppointment(this.state.id, {
            next_appt: Date(),
            comments: "dont be late"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // create a new patient record with data entered by patient
    createNewRecord = event => {
        event.preventDefault();
        patientAPI.createNewRecord(this.state.id, {

            date: Date(),
            time: "0830",
            meds_taken: true,
            // can add more detailed record of medications taken and notes here if required
            symptoms: [{
                ontime: 1,
                offtime: 2,
                tremor: 4,
                dexterity: 4,
                stiffness: 2,
                initiation: 2,
                speach: 1,
                walking: 1,
                balance: 2,
                drooling: 1,
                malaise: 2
            }],

            emergencies: [{
                falls: false,
                choking: false,
                hallucination: false
            }],

            side_effects: [{
                sickness: 1,
                dizziness: 1,
                headaches: 1,
                drymouth: 1,
                urinating: 1,
                indigestion: 2
            }],

                notes: "does this really work??"
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // create a new episode by doctor
    createNewEpisode = event => {
        event.preventDefault();
        patientAPI.createNewEpisode(this.state.id, {

            episode_id: "001",
            start_date: Date(),
            doctor: "my doctor",

            medications: [{
                medication: "Sinemet",
                dose: "100mg/10mg",
                form: "tablet",
                route: "oral",
                times: ["0800", "1600", "2000"]
            }],

            record: [{
                date: Date(),
                time: "1200",
                meds_taken: true,
                // can add more detailed record of medications taken and notes here if required
                symptoms: [{
                    ontime: 1,
                    offtime: 1,
                    tremor: 2,
                    dexterity: 3,
                    stiffness: 3,
                    initiation: 3,
                    speach: 2,
                    walking: 3,
                    balance: 1,
                    drooling: 1,
                    malaise: 1
                }],

                emergencies: [{
                    falls: false,
                    choking: false,
                    hallucination: false
                }],

                side_effects: [{
                    sickness: 2,
                    dizziness: 1,
                    headaches: 1,
                    drymouth: 1,
                    urinating: 1,
                    indigestion: 1
                }],

                notes: "First record filled in with doctor"

            }],

        })

            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // add a new patient
    addNewPatient = event => {
        event.preventDefault();
        patientAPI.createNewPatient ({

            date_created: Date(),
            active: true,
            //doctor: to be populated with _id from doctors collection,

            details: {
                patient_number: "hosp0017",
                first_name: "Billy", 
                last_name: "Thekid",
                dob:  "02/30/1965",
                email: "billytk@what.com",
                phone: "258-562-8765",
            },            
            
            appointment: {
                next_appt: Date(),
                comments: "next appt fixed",
                },

            episode: [{
                episode_id: "000",
                start_date: Date(),
                doctor: "my doctor",

                medications: [{
                    medication: "tbc",
                }],

                record: [{
                    date: Date(),
                    time: "1200",
                    meds_taken: true,
                    // can add more detailed record of medications taken and notes here if required
                }],

            }],
            // timestamps: {'created_at', 'updated_at' }
        })

        .then(res => console.log(res))
        .catch(err => console.log(err));
    };



    
    // Form handlers
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
        console.log(event.target.value);
    };


    // ------
    // Render
    // ------

    render() {
        return (

            <Container>
                Add new med:
                <Form>
                    <FormGroup>
                        <Label >Drug name: </Label>
                        <Input type="text" name="drugName" placeholder="drug name" onChange={this.handleInputChange} value={this.state.drugName} />
                    </FormGroup>
                    <FormGroup>
                        <Label> Drug Type: </Label>
                        <Input type="text" name="drugType" placeholder="drug type" onChange={this.handleInputChange} value={this.state.drugType} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Dosage: </Label>
                        <Input type="text" name="dosage" placeholder="dosage" onChange={this.handleInputChange} value={this.state.dosage} />
                    </FormGroup>
                    <Button onClick={this.loadAllPatients}>loadall</Button>
                    <Button onClick={this.createNewRecord}>record</Button>
                    <Button onClick={this.createNewEpisode}>episode</Button>
                    <Button onClick={this.addNewPatient}>add</Button>
                    <Button onClick={this.recordPatientInactive}>findOne</Button>


                </Form>
            </Container>
        )
    };
};

export default Books;
