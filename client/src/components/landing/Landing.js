import React, { Component } from 'react'
import Login from './Login'
import SignUp from './SignUp'

export default class Landing extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             account: true
        }
    }
    
    account = () =>{
        return(this.setState({
                account: !this.account
             })
        ) 
    }
    
    render() {
        console.log(this.state.account)
        return(
            <div>
                <div>
                    <div></div>
                    <div>
                        {this.state.account = true ? Login : SignUp}
                        <button onClick={this.account}></button>
                    </div>
                </div>
            </div>
        )
    }
}
