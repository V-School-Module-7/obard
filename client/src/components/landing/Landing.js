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
    
    render() {
        return(
            <div>
                <div>
                    <div></div>
                    <div>
                        {this.state.account = true ? Login : SignUp}
                    </div>
                </div>
            </div>
        )
    }
}
