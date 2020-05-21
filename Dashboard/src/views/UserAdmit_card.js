import React from 'react';
import { userContext } from 'views/Logincontext'
class AdmitCard extends React.Component {
  state = {
    UserCourse: [],
    usersinfo: []
  }
  static contextType = userContext;
  componentDidMount() {
    const { user } = this.context
    let obj = user;
    let keys = Object.keys(obj);
    let lat = obj[keys[0]].Userdetails;
    const newUser = {
      Userid: lat._id,
      status:null,
      UserCourseID: lat.UserCourseID
    }
    fetch('/users/userinfo_byid', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(UserCourse => this.setState({ UserCourse }))
      .then(this.setState({ usersinfo: lat }))
      .catch(error => console.error('Error:', error))


  }
  render() {
    if (this.state.UserCourse.status === "null") {
      return (
        <div style={{ paddingTop: "52px" }}>
          <div className="container">
        <div style={{ background: "#cce6ff", width: "100%" }}>
        
        <div ><h2> Admit Card </h2>
        </div>
        <div><h3>No Records Found.!</h3></div>
          
          </div>
       </div>
       </div>
      )
    } else {
      return (
        <div style={{ paddingTop: "50px" }}>
          <div className="row" style={{ background: "#cce6ff", width: "100%" }}>
            <div className="container">
              <div><h2> Admit Card </h2></div>
              <div key={this.state.usersinfo._id}>
                <div className="row border border-primary">
                  <div className="col-xl-3 col-xl-3 col-md-3 col-sm-3 col-xs-3">
                  <img style={{width:"100Px",height:"100px"}} src={"/uploaduserphoto/image/"+this.state.usersinfo.UserPhotoID}  alt="Placeholder image"/>
                  </div>
                  <div className="col-xl-5 col-xl-5 col-md-5 col-sm-5 col-xs-5">
                  <div> <h6>Name: {this.state.usersinfo.Fname} {this.state.usersinfo.LName} </h6>  </div>
                <div> <h6>Email Id:  {this.state.usersinfo.Useremail} </h6> </div>
                <div> <h6>Course: {this.state.UserCourse.Usercourse} </h6>  </div>
                <div>
                  </div>
                </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

  }
}


export default AdmitCard;