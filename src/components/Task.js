import React from 'react';
import {updateTask, deleteTask} from '../fetchUtils'
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'

export default function Task(props) {
    const [isComplete, setIsComplete] = React.useState(props.task.isComplete)
    const [style, setStyle] = React.useState(isComplete ? {textDecorationLine: 'line-through'} : {} )
    const [checked, setChecked] = React.useState(isComplete);

    const updateLook = () => {

        if(!isComplete){
            setStyle({textDecorationLine: 'line-through'}) 
            setIsComplete(true)
            setChecked(true)
        } else {
            setStyle({})
            setIsComplete(false)
            setChecked(false)
        }

    }

    const onClickComplete = () => {

        updateLook()

        // update task with id and new isComplete
        updateTask(props.task._id, isComplete)
        .then(result => {

            // update state and refresh
            setIsComplete(result.isComplete)
            props.refresh()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const onClickDelete = () => {

        let removeTask = props.task

        // remove task from the db and rerender
        deleteTask(removeTask._id)
        .then(response => {

           props.refresh()
        })
        .then( result => {
            updateLook()
        }
        )
        .catch(error => {
            console.log(error)
        })
    }

    const onClickEdit = () => {
        props.setIsEdit(true)
        props.setText(props.task.text)
        props.setEditId(props.task._id)
    }


    return(
        <div>
        <div  >
            <Grid container spacing={0} justify="center" alignItems="baseline">
                <Grid item xs></Grid>
                <Grid item xs>
            <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                color="primary"
                onClick={onClickComplete}
            />
            </Grid>
            <Grid item xs>
                <div style={{textAlign: 'center'}}>
                <div style={style}>
                    {`${props.task.text}`}
                </div>
                </div>
            </Grid>
            <Grid item xs>
            <IconButton aria-label="edit" onClick={onClickEdit}>
                <EditIcon fontSize='small'></EditIcon>
            </IconButton>

            <IconButton aria-label="delete" onClick={onClickDelete}>
            <DeleteIcon fontSize="small" />
            </IconButton>
            </Grid>
            <Grid item xs></Grid>
            </Grid>
            
        </div>
        </div>
    )
}