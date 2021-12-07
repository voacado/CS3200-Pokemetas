import React, { useState, useEffect } from 'react';

function Home(props) {
    useEffect(() => {
        document.body.style.backgroundColor = "#1C2128";
        document.body.style.color = "white";
        // document.body.style.backgroundSize = "cover";
        // document.body.style.backgroundPosition = "center";
        // document.body.style.backgroundRepeat = "no-repeat";
        // document.body.style.backgroundAttachment = "fixed";

        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    return (
        <div class="home">
            <h1>Home</h1>
            <p>I bring the sauce.</p>
            {/* <img src="../images/pokeball.svg"> </img> */}
        </div>
    );
}

export default Home;