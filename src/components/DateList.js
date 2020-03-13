import React from 'react';
import Task from './Task'

function DateList(props) {
    return (
        <div>
           <Task props={props}></Task>
        </div>
    );
}

export default DateList;