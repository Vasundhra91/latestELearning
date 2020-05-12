import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
//import Maapform from './RangeCircleform'
export default function Home() {
    console.log(localStorage.getItem("parentValueKey"))
    function handlechange(event) {
      // localStorage.removeItem("parentValueKey")
        }
    const useStyles = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    const classes = useStyles();
    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <div style={{paddingTop:"50px"}}>
            <div className="row" style={{ background: "blue", width: "100%" }}>
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 " style={{ paddingLeft: "70px"}} >
                    <h2>E-Learning</h2>
                </div>
             <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
            <Container component="main" maxWidth="xs" style={{background:"#cce6ff"}}>
                <form className={classes.form} noValidate>
           
                <Link href="/" onClick={handlechange} variant="body2" style={{ color: "red",fontSize:"20px"}}>
                {"Logout"}
              </Link>
          
                </form>
            </Container>
            </div>
        </div>

        </div>
    )
}
