import React from 'react';
import {uriBase, currentApi} from '../const'

export default function Task(props) {
    const [isComplete, setIsComplete] = React.useState(props.task.isComplete)
    const [style, setStyle] = React.useState(isComplete ? {textDecorationLine: 'line-through'} : {} )

    const onClickComplete = () => {

        console.log(isComplete)

        if(!isComplete){
            setStyle({textDecorationLine: 'line-through'})
            setIsComplete(true)
        } else {
            setStyle({})
            setIsComplete(false)
        }

        console.log(props.task._id)

        fetch(`${uriBase}${currentApi}/${props.task._id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"isComplete": !isComplete})
            
        })
        .then(httpResult=> {
            if(!httpResult.ok){
                console.log("Did not fetch")
            }

            return httpResult.json
        })
        .then(response => {

            console.log(props.task)
        })
        .catch(error => {
            console.log(error)
        })
    }

    //{textDecorationLine: 'line-through'}

    return(
        <div style={style}>
            <button onClick={onClickComplete}>Complete</button>
            {`${ new Date(props.task.date).toLocaleDateString()} | ${props.task.text}`}
            <button onClick={props.onClickDelete}>Delete</button>
        </div>
    )
}