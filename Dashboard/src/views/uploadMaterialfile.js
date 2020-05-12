import Button from '@material-ui/core/Button';

import React,{Component} from 'react'; 

class uploadfile extends Component { 

	constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            profileImg: ''
        }
    }

    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
        console.log(e.target.files[0])
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        console.log(this.state.profileImg)
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
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status == 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  } 
	
	render() { 
	
	return ( 
		<div> 
			<h3> 
			Study Material Upload 
			</h3> 
			<div> 
				<input type="file" onChange={this.onFileChange} /> 
        <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
          >
            Upload
          </Button>
			</div> 
      
		</div> 
	); 
	} 
} 

export default uploadfile; 
