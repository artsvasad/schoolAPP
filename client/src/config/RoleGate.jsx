import React from "react";

const RoleGate = ({allowedRoles, children})=>{
    const userString = localStorage.getItem('user')
    const user = userString?JSON.parse(userString):null
    const userRole = user?.role || null

    if(allowedRoles && !allowedRoles.includes(userRole)){
        return null
    }
    return <>{children}</>
}

export default RoleGate;