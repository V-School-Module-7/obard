import React, { Component } from 'react'
import Login from './Login'
import SignUp from './SignUp'

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
            <div>
                <div>
                    <div></div>
                    <div>
                        {this.state.account === true ? <Login/> :<SignUp/>}
                         <button onClick={this.accountChange}>{this.state.account === true ? 'Dont have an account? Sign up!' : 'Return to Login'}</button>
                    </div>
                </div>
            </div>
        )
    }
}
