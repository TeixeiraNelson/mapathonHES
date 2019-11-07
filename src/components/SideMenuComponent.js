import React from "react";
import {Link} from "react-router-dom";
export default function SideMenuComponent({user, logout, addMarkerToMap, localiseUser, isMainMenu, onSetSidebarOpen}){
    return(
        <div style={{position: 'absolute',
            margin: '50px',
            right: '0px',
            bottom: '10px',
            height: '70vh',
            width: '13vw'}}>
            {user !== null && typeof user !== 'undefined' ?
                <div>
                    <img alt={"Displays the users profile img"} height={100} width={100}
                         src={user.picture}/>
                    <p style={{color:"white"}}>{user.nickname}</p>
                </div> : <div/>}
            <br/><br/><br/>
            <button className={"button2"} onClick={logout}>logout</button>
                <br/>
                <br/>
            {isMainMenu && <div>
                <button className={"button2"} id="add-poi-button" onClick={addMarkerToMap}>
                    Add Poi
                </button>
                <br/>
                <br/>
                <button className={"button2"} id="localisation-button"
                        onClick={localiseUser}> Localisation
                </button>
                <br/>
                <br/>
                <button className={"button2"} onClick={() => onSetSidebarOpen(true)}> Menu</button>
                <br/>
                <br/>
                <Link to="/settings">
                    <button className={"button2"}>Settings</button>
                </Link></div>}
            {!isMainMenu && <div>
                <Link to="/">
                    <button className={"button2"}>Back to Home</button>
                </Link>
            </div>}
        </div>
    );
}