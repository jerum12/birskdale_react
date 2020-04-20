import React,{useContext} from 'react';
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';
import Homepage from '../components/Page/Homepage';
import Dashboard from './../components/Page/Dashboard';
import Contact from './../components/Page/Contact';
import { GenericContext } from '../context/GenericContext';



const Routes = () => {  
    
    const countContext = useContext(GenericContext)

    return (
        <div>
            {/* <button onClick={() => countContext.countDispatch('increment')}>Increment</button> */}
            
            <Router>
                    <Route exact path="/monitorStocks" component={Homepage} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/contact" component={Contact} />
            </Router>
        </div>
    )
};

export default Routes;