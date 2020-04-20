import React, {Component} from "react";
import Header from '../Header/Header'
import FetchData from '../TableResult/FetchData'
import './Homepage.css';

class Homepage extends Component {

  render() {
    return (
        <div className="app-body">
          <Header about={this.props.about}/>
          <FetchData/>

        </div>
    )
  }
}
export default Homepage;
