import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import { userContext } from 'views/Logincontext'
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import route from "routes.js";
var ps;
//var menuroute =route.filter(function (entry) { return entry.display === true; });

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      menuroute: route.filter(function (entry) { return entry.display === true; })
    };
    this.mainPanel = React.createRef();
  }
  static contextType = userContext;

  componentDidMount() {

    var adminOruser= this.props.menuroute
    if (adminOruser === "Y") {
      this.setState({menuroute: route.filter(function (entry) 
        { return entry.display === "admin" || entry.display === "both" })})
       } else if (adminOruser === "N") {
      
      this.setState({menuroute: route.filter(function (entry) 
        { return entry.display === "user" || entry.display === "both" })})
     }else{
      
      this.setState({menuroute: route.filter(function (entry) 
        { return entry.display === true})})
     }
    

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {

    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() { 
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={this.state.menuroute}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {this.state.menuroute.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          <Footer fluid />
        </div>

      </div>
    );
  }
}

export default Dashboard;
