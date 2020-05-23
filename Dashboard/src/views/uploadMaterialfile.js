import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { userContext } from 'views/Logincontext';
import axios from "axios";
import Select from "react-select";
class uploadfile extends Component {
 constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitfile = this.onSubmitfile.bind(this);
    this.state = {
      profileImg: '',
      profileImg_data: [],
      dataname:'',
      visiblebutton: true,
        selectedOption: "",
        selectedlabel:"",
        data: { label: "Loading ...", value: "" },
        loading: true,
    }
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption.value });
    this.setState({ selectedlabel: selectedOption.label });
};
  static contextType = userContext;
  componentDidMount() {
    const { user } = this.context
        let obj = user;
        let keys = Object.keys(obj);
        let lat = obj[keys[0]].Userdetails;
      
        if (lat.UserAdmin === "N") {
          this.setState({ visiblebutton: false })
        }
    fetch('/uploadfile/files')
    .then(res => res.json())
    .then(Img_data => this.setState({ profileImg_data: Img_data }))

    axios.get("/users/coursedetails")
            .then(result => this.setState({ data: result.data.map((data) => { return { value: data._id, label: data.Usercourse } }) }))
            .then(this.setState({ loading: false }))
        
  }
  onFileChange(e) {
    this.setState({ profileImg: e.target.files[0] })
  }
  onSubmitfile(e) {
    e.preventDefault()
    this.setState({ dataname:e.target.value })
    window.open("http://localhost:3001/uploadfile/files/"+""+this.state.dataname+"")
    // console.log(e.target.value)
    //  fetch('/uploadfile/files/'+ e.target.value)
    //  .then(res => res.json())
    //  .then(Img_data => this.setState({ profileImg_data: Img_data }))
  }

  onSubmit(e) {
    e.preventDefault()
    //const formData = new FormData()
    var newFileName = this.state.profileImg.name + "_Courseid_"+this.state.selectedOption;
            var formData = new FormData();
            formData.append('file', this.state.profileImg, newFileName);
    //formData.append('file', this.state.profileImg)
    fetch("/uploadfile/upload", {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=AaB03x" +
          "--AaB03x" +
          "Content-Disposition: file" +
          "Content-Type: png" +
          "Content-Transfer-Encoding: binary" +
          "...data... " +
          "--AaB03x--",
        "Accept": "application/json",
        "type": "formData"
      },
      body: formData
    }).then(res => res.json())
      .then(Img_data => this.setState({ profileImg_data: Img_data }))
  }
  handleDeleteEvent = (e) => {
    e.preventDefault();
    fetch('/uploadfile/files/' + e.target.id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(Img_data => this.setState({ profileImg_data: Img_data }))
}

  render() {
    const { selectedOption } = '';
    const view =this.state.profileImg_data.map(data => {
    return (<div key={data._id}>
      {/* <img  src={"/uploadfile/image/"+data.filename}  alt="Placeholder image"/> */}
     <div className="row">
       <div>
       <button type="submit" id={data._id} style={{backgroundColor:"#3f51b5", color:"#fff"}}
       onClick={this.onSubmitfile} value={data.filename}> 
       {data.filename.substr(0, data.filename.indexOf('_Courseid_'))} </button>
       </div>
    <div>
    <button style={{backgroundColor:"#CD5C5C", color:"#fff"}} type="submit" id={data._id} onClick={this.handleDeleteEvent}> Delete </button>
    </div>
    </div>
    </div>                                                                        
    )
  })
    return (
      <div style={{ paddingTop: "50px",paddingLeft:"15px"}}>
                        <div className="row" style={{ background: "#cce6ff", width: "100%" }}>
                            <div className="container">
        <h3>
          Study Material Upload
			</h3>
      
      <div style={{ display: (this.state.visiblebutton ? 'block' : 'none') }}>
      <div className="col-lg-3 col-xl-3 col-md-3 col-sm-6">
       <Select value={selectedOption} isDisabled={this.state.loading} classname="form-control input-sm" options={this.state.data} onChange={this.handleChange} placeholder="Course Selection" />
        </div>
          <input type="file" onChange={this.onFileChange} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
          >
            Upload
          </Button></div>
          {view}
</div>
      </div>
    </div>
    );
  }
}

export default uploadfile; 
