import React from 'react';

const Logout = (props) => {

    const logout = () => {
        fetch("http://localhost:8080/logout")
            .then(resp => {
                if (!resp.ok)
                    console.log("Something went wrong. response:", resp.statusText);
            })
            .catch(er => {
                console.log("Error: ", er);
            });

        window.localStorage.removeItem("authToken");
        window.localStorage.removeItem("userId");
        props.logoutHandler();
    };

    return (
        <div className="banner">
            <button className="banner-item banner-item--button" onClick={logout}>Logout</button>
        </div>
    );
};
export default Logout;