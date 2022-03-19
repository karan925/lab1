import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './register';
import NavBar from './NavBar/index';

class Main extends Component {
    render(){
        return(
            <NavBar />
            // <Router>
            //     <navBar />
            //     <Routes>
            //         <Route path='/' exact component={Register} />
            //         <Route path='/cats' component={Register} />
            //         <Route path='/sheeps' component={Register} />
            //         <Route path='/goats' component={Register} />
            //     </Routes>
            // </Router>

        );
    }
}
//Export The Main Component
export default Main;