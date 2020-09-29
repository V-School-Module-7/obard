// Home.js
// ==============================

// imports
import React, { Component } from 'react'
import PlaneInfo from './PlaneInfo'
import Auth from '../../../Auth'
import planeImage from '../../../assets/images/plane.jpg'
    // checkout things
import DateSelectContainer from '../DateSelectContainer'
import PilotUpload from '../PilotUpload'

// component
class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            mobileDateSelect: false,
            dateSelected: false,
        }
    }

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log("we clicked it")
    //     console.log(this.state.firstName)
    // }

    toggleMobileDateSelect = () => {
        this.setState({
            mobileDateSelect: !this.state.mobileDateSelect
        })
    }

    
    toggleDateSelected = () => {
        this.setState({
            dateSelected: !this.state.dateSelected
        })
    }

    render(props) {

        const handlePilotUpload = () => { // this will need to be refractored to cause the component to "hide" offscreen and have the boolean value affect a "style" attribute in order to pull it on screen at the appropriate time.
            if (this.state.dateSelected) {
                return <PilotUpload />
            }
            return null
        }

        return (
            <>
                <Auth/>

                <div className={"home"}>
                <div className={"wrapper"}>
                    <div className="home__main">
                        <img src={planeImage} alt="" className={"home__plane-image"}/>
                        <PlaneInfo toggleMobileDateSelect={this.toggleMobileDateSelect} mobileDateSelectEnabled={this.state.mobileDateSelect}/>
                    </div>
                    <DateSelectContainer toggleDateSelected={this.toggleDateSelected} mobileDateSelectEnabled={this.state.mobileDateSelect}/>
                    {handlePilotUpload()}   
                    -  {/* see comments above by the function */}
                </div>
            </div>
            </>
            )

    }
}

// exports
export default Home


