// PILOT UPLOAD CONTAINER
// ==================================

// imports
import React from 'react';
import { useHistory } from 'react-router-dom'

// component
const PilotUploadContainer = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/checkout')
    }

    return (
        <div>
            INSURANCE PLACEHOLDER
            <button onClick={handleClick}>
                CONTINUE
            </button>
        </div>
    )
}

export default PilotUploadContainer
