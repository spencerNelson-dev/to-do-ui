import React from 'react';

export default function Task(props) {

    // update the textfield to show what we type
    const onChangeHandler = (event) => {

        props.setText(event.target.value)

        if(event.keyCode === 13){
            props.onClickAdd(event)
        }
    }

    // function to display button
    // depending on the state
    const createButton = () => {

        if(!props.isEdit){
            return (
                <button className='addButton' onClick={props.onClickAdd}>Add</button>
            )
        } else {
            return (
                <button className='editButton' onClick={props.onClickEdit}>Edit</button>
            )
        }

    }

    return(
        <div style={{backgroundColor: "lightblue", padding: '10px', height: '50px'}}>
            {props.isEdit ? "Edit Task:": "New Task:"}
         <input className='taskText' style={{margin: '5px', height: '50%', width: '35%', fontSize: '16px'}}
          type='text' onChange={onChangeHandler} value={props.text} onKeyUp={onChangeHandler}>
          </input>
            {createButton()}
        </div>
    )
}