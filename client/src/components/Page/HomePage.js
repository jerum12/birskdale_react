import React, {Component} from "react";
import Header from './../Header/Header'
import FetchData from './../TableResult/FetchData'

class HomePage extends Component {

  render() {
    return (
        <div>
          <Header about={this.props.about}/>
          <FetchData/>

        </div>
    )
  }
}
export default HomePage;
