import React from 'react';
import color from '@material-ui/core/colors/lightBlue';

export default function Task(props) {

    const onChangeHandler = (event) => {

        props.setText(event.target.value)
    }

    return(
        <div style={{backgroundColor: "lightblue", padding: '10px'}}>
            New Task:
         <input style={{margin: '5px'}} type='text' onChange={onChangeHandler} value={props.text}></input>
            <button onClick={props.onClickAdd}>Add</button>
        </div>
    )
}