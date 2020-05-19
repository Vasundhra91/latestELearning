import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
import { userContext } from 'views/Logincontext'
export default class User_paper extends Component {
    state = {
        testpaper: [],
        Ques_id: "",
        DeletedQues_id: false,
        Username: "",
        visiblebutton: true,
        admin: "Y"
    }
    static contextType = userContext;
    componentDidMount() {
        const { user } = this.context
        let obj = user;
        let keys = Object.keys(obj);
        let lat = obj[keys[0]].Userdetails;
        this.setState({ admin: lat.UserAdmin })
        //let userinfo=  this.props.location.state.Name
        // userinfo =userinfo.split('-')
        // this.setState({ Username: userinfo[0] })
        if (lat.UserAdmin === "N") {
            const newUser = {
                Userid: lat._id,
                UserCourseID: lat.UserCourseID
            }
            this.setState({ visiblebutton: false })
            fetch('/users/UserTestPaper', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(testpaper => this.setState({ testpaper }))
                .catch(error => console.error('Error:', error))
        } else {
            const newUser = {
                Userid: lat._id
            }
            fetch('/users/AdminTestPaper', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(testpaper => this.setState({ testpaper }))
                .catch(error => console.error('Error:', error))

        }
    }

    handleSumbmitEvent = (e) => {
        e.preventDefault();
        this.setState({ Ques_id: e.target.id })
    }
    handleDeleteEvent = (e) => {
        e.preventDefault();
        this.setState({ DeletedQues_id: true });
        fetch('/users/deletetest_paper/' + e.target.id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(testpaper => this.setState({ testpaper }))
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error))
    }
    render() {
        if (this.state.testpaper == '') {
            return (
                <div style={{ paddingTop: "50px" }}>
                    <div className="row" style={{ background: "#cce6ff", width: "100%" }}>
                        <div className="container">
                            <h3>No Test Paper Uploaded!!</h3>
                        </div>
                    </div></div>
            )
        }
        if (this.state.Ques_id !== "") {

            if (this.state.admin === "N") {
                return (
                    <Redirect to={{
                        pathname: "/admin/User_test",
                        state: { id: this.state.Ques_id }
                    }} />

                )
            } else if (this.state.admin === "Y") {
                return (
                    <Redirect to={{
                        pathname: "/admin/ViewQuesPaper",
                        state: { id: this.state.Ques_id }
                    }} />
                )
            }
        }
        else {
            const MCQ_queslist = this.state.testpaper.map(MCQ_ques => {

                return (
                    <div key={MCQ_ques.Ques_id}>
                        <div className="content">
                            <Row>
                                <Col md="12">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle tag="h4">Question Paper for {MCQ_ques.UserCourseName}</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Table >
                                                <tbody>
                                                    <tr>
                                                        <td>  <button className="btn btn-primary"  type="submit" id={MCQ_ques.Ques_id} onClick={this.handleSumbmitEvent}> Procced for Test </button></td>
                                                        <td style={{ display: (this.state.visiblebutton ? 'block' : 'none') }}>
                                                            <button className="btn btn-primary" type="submit" id={MCQ_ques.Ques_id} onClick={this.handleDeleteEvent}> Delete </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            }
            )
            return (

                <div style={{ paddingTop: "50px" }}>
                    <div className="row" style={{ background: "#cce6ff", width: "100%" }}>
                        <div className="container">
                            <div>
                                {this.state.Username}
                            </div>
                            {MCQ_queslist}
                        </div>
                    </div>
                </div>
            )
        }
    }

}