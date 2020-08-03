import React,{useState, useContext} from 'react'
import jwt_decode from 'jwt-decode'
import {GenericContext} from '../../context/GenericContext'
import { history } from '../../util/History';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import About from './../Page/About'
import Contact from './../Page/Contact'
import './Dashboard.css';
import { Icon } from 'semantic-ui-react'
import ClickOutside from '../../util/ClickOutside'

function Dashboard() {

    const genContext = useContext(GenericContext)

    const [isLoggedOut,setIsLoggedOut] = useState(false)
    const token = sessionStorage.getItem("jwtTokenKey")
    const decoded = jwt_decode(token)
    const [expanded, setexpanded] = useState(false)


    const logOut = () => {
        sessionStorage.removeItem('jwtTokenKey');
        setIsLoggedOut(true)
        genContext.dispatchName({type: 'LOGOUT_SUCCESS', payload: ''})
    }

 

    if (isLoggedOut) 
        // return  <Redirect to="/monitorStocks" />
        history.push('/monitorStocks')
    else
        return (
            <div>
                       <Router>
                        <Route render={({ location, history }) => (
                            <React.Fragment>

                                <ClickOutside
                                    onClickOutside={() => {
                                        setexpanded(false)
                                    }}
                                >
                                <SideNav
                                    onSelect={(selected) => {
                                        const to = '/' + selected;
                                        if (location.pathname !== to) {
                                            history.push(to);
                                        }
                                    }}
                                    expanded={expanded}
                                    onToggle={(expanded) => {
                                        setexpanded(expanded)
                                    }}

                                    className='testStyle'
                                >
                                    <SideNav.Toggle className='testStyle2'/>
                                    <SideNav.Nav defaultSelected="dashboard" className='testStyle3'>
                                        <NavItem eventKey="dashboard/stocks/inquire" className='testStyle4'>
                                            <NavIcon>
                                                    <Icon name='chart line' className="nav-icon" style={{ fontSize: '1.75em' }}/>
                                                {/* <i className="chart line" style={{ fontSize: '1.75em' }} /> */}
                                            </NavIcon>
                                            <NavText>
                                                Stocks Maintenance
                                            </NavText>
                                                        <NavItem eventKey="dashboard/stocks/inquire">
                                                            <NavText>
                                                                Inquire Stocks
                                                            </NavText>
                                                        </NavItem>
                                                        <NavItem eventKey="dashboard/contact2">
                                                            <NavText>
                                                                Approve Stocks
                                                            </NavText>
                                                        </NavItem>

                                        </NavItem>
                                        <NavItem eventKey="dashboard/contact">
                                            <NavIcon>
                                            <Icon name='user' className="nav-icon" style={{ fontSize: '1.75em',  }}/>
                                            </NavIcon>
                                            <NavText>
                                                Devices
                                            </NavText>
                                        </NavItem>
                                    </SideNav.Nav>
                                </SideNav>
                                <main>
                                    <Route path="/dashboard/stocks/inquire" exact component={props => <About />} />
                                    <Route path="/dashboard/contact" exact component={props => <Contact />} />
                        
                                </main>

                            </ClickOutside>
                            </React.Fragment>
                        )}
                        />
                    </Router>
                Dashboard
                    {decoded.id} - {decoded.user_name}     

                    
                    <button onClick={logOut}>Logout</button>
            </div>
        )
}



export default Dashboard
