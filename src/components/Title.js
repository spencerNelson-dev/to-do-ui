import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import {uriBase, userApi} from '../const'



export default function Title(props) {

    return (
        <div style={{ backgroundColor: "lightblue", padding: '10px' }}>
            <h1>Task Manager</h1>
        </div>
    )
}
