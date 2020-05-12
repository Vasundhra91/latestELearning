import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
import {userContext} from 'views/Logincontext'
export default class User_paper extends Component {
    state = {
        testpaper: [],
        Ques_id: "",
        DeletedQues_id: false,
        Username:"",
        visiblebutton:true,
        admin:"Y"
    }
    static contextType = userContext;
    componentDidMount() {
        const { user } = this.context
        let lat = user.Userdetails;
        this.setState({admin:lat.UserAdmin})
        //let userinfo=  this.props.location.state.Name
        // userinfo =userinfo.split('-')
        // this.setState({ Username: userinfo[0] })
        if(lat.UserAdmin==="N"){
        const newUser = {
            Userid: lat._id,
            UserCourseID: lat.UserCourseID
          }
         this.setState({visiblebutton:false})
        fetch('/users/UserTestPaper', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .then(testpaper => this.setState({ testpaper }))
            .catch(error => console.error('Error:', error))
        }else{
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
        this.setState({ DeletedQues_id:true});
        fetch('/users/deletetest_paper/'+ e.target.id , {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }}).then(res => res.json())
            .then(testpaper => this.setState({ testpaper }))
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error))
    }
    render() {
        var count = 0;
       
        if (this.state.Ques_id !== "") {
            
            if(this.state.admin==="N"){
            return (
                <Redirect to={{
                    pathname: "/admin/User_test",
                    state: { id: this.state.Ques_id }
                }} />
                
            )
            } else if(this.state.admin==="Y"){
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
                    count++;
                    return (
                    <div  key={MCQ_ques._id} >
                        <Row>
                            <Col md="12">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">Question Paper: {count}</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table>
                                                <tr>
                                                    <td>
                                                    <div>
                                                        <button type="submit" id={MCQ_ques.Ques_id} onClick={this.handleSumbmitEvent}> Test Paper: {count} </button>
                                                    </div>
                                                    </td>
                                                    <td style={{display:(this.state.visiblebutton ? 'block' : 'none') }}>
                                                        <button type="submit" id={MCQ_ques.Ques_id} onClick={this.handleDeleteEvent}> Delete Test Paper: {count} </button>
                                                    </td>
                                                </tr>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        </div>
                    )
                }
                )
                return (
                    
                  <div>
                      <div>
                          {this.state.Username}
                      </div>
                    {MCQ_queslist}
                  </div>
                )
        }
    }

}