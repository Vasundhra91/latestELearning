import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import { userContext } from 'views/Logincontext'
export default class User_test extends Component {
    state = {
        users: [],
        Marks: " ",
        Result: " ",
        users_answer: [],
        selectedValue: "",
        userinfoid: ""
    }
    static contextType = userContext;
    componentDidMount() {
        const { user } = this.context

        let lat = user.Userdetails;
        this.setState({ userinfoid: lat._id })
        console.log(this.props.location.state.id)
        const newUser = { Ques_id: this.props.location.state.id }
        fetch('/users/id', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            //.then(response => console.log('Success:', JSON.stringify(response)))
            .then(users => this.setState({ users }))
            .catch(error => console.error('Error:', error))

    }
    handleSumbmitEvent = (e) => {
        e.preventDefault();
        var a = this.state.users_answer;
        var b = this.state.users;
        // let testResult = [];
        // let usertestResult = "";
        if (a.length !== b.length)
            this.setState({ Marks: "incorrect format" })
        else {
            var totalmarks = 0;

            for (var i = 0; i < a.length; i++) {
                // let Result = ""
                // var answers = "W"
                // let item = {}
                // let jsonObj = [];

                // item["Ques_id"] = b[i].Ques_id;
                // item["MCQ_tests_id"]=b[i]._id;
                // item["MCQ_Answer"] = a[i][0].MCQ_Answer;
                // item["MCQ_Ques"] = b[i].MCQ_ques;
                if (a[i][0].MCQ_Answer === b[i].MCQ_Answer && (a[i][0].Ques_id == b[i]._id)) {
                    totalmarks++;
                    // answers = "R";
                    // item["Result"] = answers;
                }
                else {
                    // answers = "W";
                    // item["Result"] = answers;
                }
                //      jsonObj.push(item);
                //    testResult.push(jsonObj)
            }
            //console.log(JSON.stringify(testResult))
        }

        var percent = totalmarks * 100 / a.length;
        var Result = ""
        if (Math.round(percent) >= 60) {

            this.setState({ Marks: totalmarks })
            this.setState({ Result: "PASS" })
            Result = "PASS"
        }
        else {
            this.setState({ Marks: totalmarks })
            this.setState({ Result: "FAIL" })
            Result = "FAIL"
        }
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        const newUser = {
            Ques_id: b[0].Ques_id,
            User_id: this.state.userinfoid,
            Marks: totalmarks,
            Result: Result,
            Inserted_date: date
        }
        fetch('/users/UserTestResult', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(returndata => this.setState({ setSubmit: returndata }))
            .catch(error => console.error('Error:', error));
    }

    render() {

        let Result = ""
        let item = {}
        let jsonObj = [];

        const handleChange = event => {
            this.setState({ selectedValue: event.target.value });
            item["Ques_id"] = event.target.id;
            item["MCQ_Answer"] = event.target.value;
            jsonObj.push(item);
            Result = [...this.state.users_answer, jsonObj]
            this.setState({
                users_answer: Result
            })
        };

        const MCQ_queslist = this.state.users.map(MCQ_ques => {
            return (
                <div key={MCQ_ques._id}>
                    <div> Question: {MCQ_ques.MCQ_ques} </div>
                    <div> Option:  </div>
                    {MCQ_ques.MCQ_option.map(function (MCQ_option, i) {
                        return <div key={i}>
                            <label>
                                <Radio
                                    // checked={this.state.selectedValue === {MCQ_option}}
                                    onChange={handleChange}
                                    id={MCQ_ques._id}
                                    value={MCQ_option}
                                    color="default"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'D' }}
                                />
                                {MCQ_option}
                            </label>
                        </div>
                    })}
                </div>
            )})
        return (

            <form onSubmit={this.handleSumbmitEvent}>
                <div style={{ paddingTop: "50px" }}>
                    <div className="container">
                        <div style={{ background: "#cce6ff", width: "100%" }}>
                            <h2>Test Paper</h2>
                            {MCQ_queslist}
                            <div style={{ color: 'Blue' }}>
                                <h3> {this.state.Marks} {this.state.Result}</h3>
                            </div>
                            <button type="submit">Submit </button>
                        </div>
                    </div></div>
            </form>
        )
    }
}