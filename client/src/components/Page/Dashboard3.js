import React,{useState, useContext, useEffect, Fragment} from 'react'
import jwt_decode from 'jwt-decode'
import {GenericContext} from '../../context/GenericContext'
import { history } from '../../util/History';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import About from './../Page/About'
import Contact from './../Page/Contact'
import FetchData from './../TableResult/FetchData'
import './Dashboard3.css';
import ClickOutside from '../../util/ClickOutside'
import Title from 'antd/lib/typography/Title';
import { Layout, Menu, Breadcrumb, Avatar, Button } from 'antd';
import {UserOutlined, TeamOutlined,   BarChartOutlined, BarsOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Moment from 'moment'
import ClockTimer from './ClockTimer'


const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const routes = [
    { path: '/dashboard/stocks/inquire',
      exact: true,
      component: props => <FetchData />,
      main: () =>   <Fragment><Breadcrumb.Item>Stock Maintenance</Breadcrumb.Item><Breadcrumb.Item>Inquire</Breadcrumb.Item></Fragment>
    },
    { path: '/dashboard/stocks/approval',
      exact: true,
      component: props => <Contact />,
      main: () =>  <Fragment><Breadcrumb.Item>Stock Maintenance</Breadcrumb.Item><Breadcrumb.Item>Approval</Breadcrumb.Item></Fragment>
    },
    { path: '/dashboard/parameter/param',
      exact: true,
      component: props => <Contact />,
      main: () =>  <Fragment><Breadcrumb.Item>Parameter Maintenance</Breadcrumb.Item><Breadcrumb.Item>Parameter</Breadcrumb.Item></Fragment>
    },
    { path: '/dashboard/user/inquire',
      exact: true,
      component: props => <Contact />,
      main: () =>  <Fragment><Breadcrumb.Item>User Maintenance</Breadcrumb.Item><Breadcrumb.Item>Inquire</Breadcrumb.Item></Fragment>
    }
  ]


function Dashboard3() {

    console.log("dashboard3-----------")
    const genContext = useContext(GenericContext)

    const [isLoggedOut,setIsLoggedOut] = useState(false)
    const token = localStorage.getItem("jwtTokenKey")
    const decoded = jwt_decode(token)
    const [collapsed, setcollapsed] = useState(true)


    const logOut = () => {
        localStorage.removeItem('jwtTokenKey');
        setIsLoggedOut(true)
        genContext.dispatchName({type: 'LOGOUT_SUCCESS', payload: '' , login : false})
    }

    const toggle = () => {
        setcollapsed(!collapsed)
    };

    const [timeclock , settimeclock] = useState(new Date()); 

    // useEffect(() => {
    //    // const timerID = setInterval(() => tick(), 1000);
    //     const timeoutID = window.setTimeout(() => {
    //         console.log('tick')
    //         tick()
    //     }, 1000);
    //     return () => {
    //         console.log("unmounting here")
    //         //clearInterval(timerID)
    //         window.clearInterval(timeoutID );
    //     }

    // },[]);

    // const tick = () => {
    //     settimeclock(new Date())
    //   }

    if (isLoggedOut) 
        history.push('/monitorStocks')
        //return <Redirect to='monitorStocks' />
    else
        return (
            <div>
                 <Router>
                     <Layout style={{ minHeight: '100vh' }}>
                        <Sider  
                                 trigger={null}  collapsible collapsed={collapsed} onCollapse={toggle} className='sliderMenu' breakpoint={'xxl'}>
                        <div className="logo">  </div>

                            <Menu theme="dark" defaultSelectedKeys={['sub1']} mode="inline">

                                    <SubMenu
                                        key="1"
                                        title={
                                            <span>
                                                <BarChartOutlined />
                                                <span>Stock Maintenance</span>
                                            </span>
                                        }
                                        className="submenu-slider"
                                        >
                                        <Menu.Item key="sub1"><Link to="/dashboard/stocks/inquire">Stocks Inquire</Link></Menu.Item>
                                        <Menu.Item key="sub2"><Link to="/dashboard/stocks/approval">Stocks Approval</Link></Menu.Item>
                                    </SubMenu>

                                    <SubMenu
                                        key="2"
                                        title={
                                            <span>
                                            <SettingOutlined />
                                            <span>Parameter Maintenance</span>
                                            </span>
                                        }
                                        >
                                        <Menu.Item key="sub3"><Link to="/dashboard/parameter/param">Parameter</Link></Menu.Item>
                                    </SubMenu>

                                    <SubMenu
                                        key="3"
                                        title={
                                            <span>
                                        <TeamOutlined />
                                            <span>User Maintenance</span>
                                            </span>
                                        }
                                        >
                                        <Menu.Item key="sub4"><Link to="/dashboard/user/inquire">Inquire User</Link></Menu.Item>
                                    </SubMenu>

                                    <Menu.Item key="4" style={{position : 'fixed', bottom : '0'}} onClick={logOut}>
                                             <LogoutOutlined />
                                            <span>Log Out</span>
                                    </Menu.Item>
                            
                            </Menu>
                        </Sider>
                       
                       
                        <Layout className="site-layout">


                            <Header className="site-layout-background">

                                        <Button  className='trigger' onClick={toggle} style={{background: '#f8b739', borderColor: '#f8b739'}}><BarsOutlined style={{color:'white',fontSize : '15px'}}/></Button>

                                        <Breadcrumb style={{display : 'inline-block', left : '30px', position : 'relative'}}>
                                                     
                                                {routes.map((route) => (
                                                    <Route
                                                    key={route.path}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    component={route.main}
                                                    />
                                                ))}
                                        </Breadcrumb>
            

                                <Avatar style={{ float: 'right', position : 'relative', top : '10px' }} size="large" icon={<UserOutlined />} />

                                <div  style={{ float: 'right', position : 'relative' , top : '15px'}}>
                                     <span> <Title style={{fontSize : '15px'}}>{decoded.details.full_name}</Title></span>
                                     <span> <Title style={{fontSize : '12px', float : 'right'}}>  
                                                {/* {Moment(new Date()).format('MMM DD, YYYY')} {timeclock.toLocaleTimeString()} */}
                                                <ClockTimer/>
                                            </Title></span>
                                </div>
                                
                             
                            </Header>

                            <Content 
                                className="site-layout-background"
                                style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                                }}>
                              

                                <div className="site-layout-background" >
                                     
                                    {routes.map((route) => (
                                        <Route
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.component}
                                        />
                                    ))}

                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Router>
            </div>
        )
}



export default Dashboard3
