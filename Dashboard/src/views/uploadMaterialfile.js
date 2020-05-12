import Button from '@material-ui/core/Button';

import React, { Component } from 'react';

class uploadfile extends Component {

  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      profileImg: '',
      profileImg_data: []
    }
  }

  onFileChange(e) {
    this.setState({ profileImg: e.target.files[0] })
    console.log(e.target.files[0])
  }
  onSubmitfile(e) {
    e.preventDefault()
    console.log(e.target.id)
    fetch('/uploadfile/files/'+ e.target.id , {
      method: 'get',
      headers: {
          'Content-Type': 'application/json'
      }})
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={this.onSubmitfile}
        id={data._id}
      >
        {data.filename}
      </Button>
    </div>
    )
  })
    console.log(this.state.profileImg_data)
    return (
      <div>
        <h3>
          Study Material Upload
			</h3>
          <input type="file" onChange={this.onFileChange} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
          >
            Upload
          </Button>
          {view}

      </div>
    );
  }
}

export default uploadfile; 
