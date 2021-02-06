import React, { Component } from 'react'
import Login from './Login'
import SignUp from './SignUp'

//css Imports
import './landingCSS/landing.css'

export default class Landing extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             account: true,
        }
    }
    
    accountChange = (e) =>{
        e.preventDefault()
        let value = this.state.account
        this.setState({
            account: !value
        })
        console.log(this.state.account)
    }
    
    render() {
        console.log(this.state.account)
        return(
            <div className='landing-background'>
                <div className='landing-filter-background'>
                    <div className="landing-container-div">
                        <div>
                        <button onClick={this.accountChange}>{this.state.account === true ? 'Dont have an account? Sign up!' : 'Return to Login'}</button>
                        </div>
                        <div className='dividing-line'></div>
                        <div className='alternating-form-container'>
                            {this.state.account === true ? <Login/> :<SignUp/>}
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}