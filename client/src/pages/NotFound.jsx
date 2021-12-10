import React from 'react';

/**
 * Any route on the site that does not exist will redirect here.
 * 
 * @param props arguments passed by parent component
 */
function NotFound(props) {
    return (
        <div>
            <h1>404</h1>
            <p>The page you requested does not exist</p>
        </div>
    );
}

export default NotFound;