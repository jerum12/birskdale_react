import React, { Component, Suspense } from 'react';
import { Switch, Route, useHistory, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import {JWTExpiredModal} from '../Pages/JWTExpiredModal';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            showModalJWT: sessionStorage.getItem('expired') ? true : false
        }


        this.handleLogout = this.handleLogout.bind(this)
    }
  
      handleLogout() {
        this.setState({showModal: false})
        this.setState({showModalJWT: false})
        this.onLogOut();
      }

      onLogOut(){
        //console.log('logout')
        sessionStorage.removeItem('jwtTokenKey');
        sessionStorage.removeItem('login');
        this.props.loggedOut();
        this.props.history.push('/login')  
      }
    // setupBeforeUnloadListener = () => {
    //     window.addEventListener("beforeunload", (ev) => {
    //         //console.log('clear storage')
    //         ev.preventDefault();
    //         //return ev.returnValue = 'Are you sure you want to close?';
    //         sessionStorage.clear();
    //     });
    // };

    //  componentWillUnmount = () => {
    //     window.removeEventListener('popstate', this.onBackButtonEvent);
    // }

    // componentDidMount() {
    //     // Activate the event listener
    //     this.setupBeforeUnloadListener();
    //     //this.onScrollNearBottom(this.scrollToLoad);
    //     //window.history.pushState(null, null, window.location.pathname);
    //     //window.addEventListener('popstate', this.onBackButtonEvent);
    // }
    // }
    // onBackButtonEvent = (e) => {
    //     e.preventDefault();

    //     //console.log('clicked back')
    //     // if (!this.state.isBackButtonClicked) {
    //     //     ////console.log('clicked back')
    //     //      if (window.confirm("Do you want to save your changes")) {
    //     //    //this.isBackButtonClicked = true;
    //     //    this.setState({ isBackButtonClicked: true })
    //     //    // your custom logic to page transition,like react-router-dom history.push()
    //     //    //console.log('clicked back')
    //     //     } else {
    //     //      window.history.pushState(null, null, window.location.pathname);
    //     //      this.setState({ isBackButtonClicked: false })
    //     //      //this.isBackButtonClicked = false;
    //     //    }
    //     // }
    //   }

    // componentDidMount() {
    //    // disableBrowserBackButton();

    //   }
    
    //   componentWillUnmount() {
    //    // disableBrowserBackButton();
    //     this.setupBeforeUnloadListener();
    //   }

    //    setupBeforeUnloadListener = () => {
    //     window.addEventListener("beforeunload", (ev) => {
    //         //console.log('refresh page')
    //         sessionStorage.clear();
    //     });
    // };

    
    
    //  onBackButtonEvent = (e) => {
    //     e.preventDefault();
    //    //console.log('clicked back')
    //   }

      
    render() {

        ////console.log("here--------------------")

        
        const menu = routes.map((route, index) => {
          return (route.component) ? (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
          ) : (null);
        });

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Switch>
                            {menu}
                            <Route path="/" component={AdminLayout} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default App;
