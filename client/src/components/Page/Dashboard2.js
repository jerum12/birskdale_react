import React,{useState, useContext} from 'react'
import jwt_decode from 'jwt-decode'
import {GenericContext} from '../../context/GenericContext'
import { history } from '../../util/History';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import About from './../Page/About'
import Contact from './../Page/Contact'
import ClickOutside from '../../util/ClickOutside'
import './Dashboard2.css'
import SiderDemo from './SliderDemo'
import { Layout, Avatar, Menu, Breadcrumb, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Cricketer, ODICareer, Batting, Bowling, TestCareer } from './Cricketer';
import CareerDetails from './CareerDetails';
import { Icon } from 'semantic-ui-react'

const { Header, Footer, Sider, Content } = Layout;

function Dashboard2() {




    const genContext = useContext(GenericContext)

    const [isLoggedOut,setIsLoggedOut] = useState(false)
    const token = localStorage.getItem("jwtTokenKey")
    const decoded = jwt_decode(token)
    const [expanded, setexpanded] = useState(false)
    const [activeKey, setActiveKey] = useState(1)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const logOut = () => {
        localStorage.removeItem('jwtTokenKey');
        setIsLoggedOut(true)
        genContext.dispatchName({type: 'LOGOUT_SUCCESS', payload: ''})
    }

    const handleToggle = () => {
        setexpanded(!expanded)
      }
    
    const  handleSelect = (eventKey) => {
        setActiveKey(eventKey)
      }

      const [selectedPlayer, setSelectedPlayer] = useState('');
    const [visible, setVisible] = useState(false);
    const onSelect = name => {
        setSelectedPlayer(name);
        setVisible(true);
    }
    const ViewProfileButton = ({name}) => {
        return <Button type='dashed' style={{float:'right'}} onClick={()=>onSelect(name)}> View Full Profile >> </Button>
      }
      
      const onClose = () => setVisible(false);

    if (isLoggedOut) 
        // return  <Redirect to="/monitorStocks" />
        history.push('/monitorStocks')
    else
        return (
            <div >
            

            <Layout>
                <Header style={{ padding: 10 }}>
                <Avatar style={{ float: 'right' }} src='./dp.png' />
                <Title style={{ color: 'white' }} level={3}>SHRIDEEP</Title>
                </Header>
                <Layout>
                <Sider>
                    <Menu
                    defaultSelectedKeys={['Dashboard']}
                    mode="inline"
                    >
                    <Menu.Item key='Dashboard'>
                        <Link to="/dashboard/aboutus">Dashboard</Link>
                    </Menu.Item>
                    <SubMenu
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>About US</span>
                        </span>
                        }
                    >
                        <Menu.ItemGroup key='AboutUS' title='Country 1'>
                        <Menu.Item key='location1'>  <Link to="/dashboard/contact">Location 1</Link></Menu.Item>
                        <Menu.Item key='location2'> Location 2</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <Route
                        path="/dashboard/aboutus"
                        component={About}
                        exact 
                    />
                    <Route
                        path="/dashboard/contact"
                        component={Contact} 
                        exact
                    />
                    <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                        <Cricketer name='Virat Kohli' team='IND' avatarSrc='./vk.jpg'>
                        <ODICareer matches='239' >
                            <Batting runs='11,520' score='183' />
                            <br></br>
                            <Bowling wickets='4' bowlingAvg='166.25' />
                        </ODICareer>
                        <TestCareer matches=' 79' >
                            <Batting runs='6,749' score='243' />
                        </TestCareer>
                        <ViewProfileButton name='Virat Kohli'/>
                        </Cricketer>
                        <Cricketer name='Jasprit Bumrah' team='IND' avatarSrc='./jb.jpg'>
                        <TestCareer matches='12' >
                            <Bowling wickets='62' bowlingAvg='20.63' />
                        </TestCareer>
                        <ViewProfileButton name='Jasprit Bumrah'/>
                        </Cricketer>
                    </div>
                    </Content>
                    <CareerDetails player={selectedPlayer} visible={visible} onClose={onClose} />
                    <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by Shrideep</Footer>
                </Layout>
                </Layout>
            </Layout>

               
{/*              
                Dashboard
                    {decoded.id} - {decoded.user_name}     

                    
                    <button onClick={logOut}>Logout</button> */}
            </div>
        )
}



export default Dashboard2
