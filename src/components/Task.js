import React from 'react';
import {uriBase, currentApi} from '../const'
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export default function Task(props) {
    const [isComplete, setIsComplete] = React.useState(props.task.isComplete)
    const [style, setStyle] = React.useState(isComplete ? {textDecorationLine: 'line-through'} : {} )
    const [checked, setChecked] = React.useState(isComplete);

    const onClickComplete = () => {

        if(!isComplete){
            setStyle({textDecorationLine: 'line-through'})
            setIsComplete(true)
        } else {
            setStyle({})
            setIsComplete(false)
        }

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
        .catch(error => {
            console.log(error)
        })
    }

    //{textDecorationLine: 'line-through'}

    return(
        <div>
        <div style={style}>
            <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                color="primary"
                onClick={onClickComplete}
            />
            {`${ new Date(props.task.date).toLocaleDateString()} | ${props.task.text} `}

            <IconButton aria-label="delete" onClick={props.onClickDelete}>
            <DeleteIcon fontSize="small" />
            </IconButton>
        </div>
        </div>
    )
}