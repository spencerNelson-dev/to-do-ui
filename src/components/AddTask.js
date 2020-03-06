import React from 'react';

export default function Task(props) {

    const onChangeHandler = (event) => {

        props.setText(event.target.value)
    }

    return(
        <div>
            New Task:
         <input type='text' onChange={onChangeHandler} value={props.text}></input>
            <button onClick={props.onClickAdd}>Add</button>
        </div>
    )
}