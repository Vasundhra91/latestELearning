import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { userContext } from 'views/Logincontext';
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
    }
  }
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
  }
  onFileChange(e) {
    this.setState({ profileImg: e.target.files[0] })
    console.log(e.target.files[0])
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
    const formData = new FormData()
    formData.append('file', this.state.profileImg)
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

  render() {
    const view =this.state.profileImg_data.map(data => {
    return (<div key={data._id}>
      {/* <img  src={"/uploadfile/image/"+data.filename}  alt="Placeholder image"/> */}
       <button type="submit" id={data._id} style={{backgroundColor:"#3f51b5", color:"#fff"}}
       onClick={this.onSubmitfile} value={data.filename}> {data.filename} </button>

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
