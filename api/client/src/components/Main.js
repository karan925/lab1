import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Register from './register';
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Register}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;