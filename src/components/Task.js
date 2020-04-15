import React from 'react';
import { updateTask, deleteTask } from '../fetchUtils'
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import { TasksContext } from './TasksContext'

export default function Task(props) {
    const [isComplete, setIsComplete] = React.useState(props.task.isComplete)
    const [style, setStyle] = React.useState(isComplete ? { textDecorationLine: 'line-through' } : {extDecorationLine: 'none'})
    const [checked, setChecked] = React.useState(isComplete);

    const { tasks, setTasks } = React.useContext(TasksContext)

    // function to update the look
    // crossing out completed tasks
    const updateLook = () => {

        if (!isComplete) {
            setStyle({ textDecorationLine: 'line-through' })
            setIsComplete(true)
            setChecked(true)
        } else {
            setStyle({ textDecorationLine: 'none' })
            setIsComplete(false)
            setChecked(false)
        }

    }

    // update the db with the task
    // that is complete
    const onClickComplete = () => {

        // update task with id and new isComplete
        updateTask(props.task._id, isComplete)
            .then(response => {

                //if the response tells us that
                //one item was changed
                if (response.n === 1) {

                    // copy state
                    let updatedArr = [...tasks]


                    // update the state of the elment with
                    // matching _id
                    for (let element of updatedArr) {

                        if (element._id === props.task._id) {

                            //update the completed prop
                            // by just switching boolean
                            element.complete = !element.complete
                        }
                    }

                    //set the state
                    setTasks(updatedArr)
                    updateLook()
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    // delete the task
    const onClickDelete = () => {

        // the task we are deleting
        // we want to save a copy in
        // memory
        let removeTask = props.task

        // remove task from the db and
        // update the tasks array
        deleteTask(removeTask._id)
            .then(response => {

                //if the response tells us that
                //one item was deleted
                if (response.n === 1) {

                    // copy state
                    let updatedArr = [...tasks]

                    let index

                    // find the indexOf the deleted task
                    for (let element of tasks) {

                        if (element._id === removeTask._id) {
                            index = tasks.indexOf(element)
                        }
                    }

                    //remove it from the tasks array
                    updatedArr.splice(index, 1)

                    //set the state
                    setTasks(updatedArr)
                    updateLook()
                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    // move the task information into the edit
    // bar and change the button
    const onClickEdit = () => {
        props.setIsEdit(true)
        props.setText(props.task.text)
        props.setEditId(props.task._id)
    }


    return (
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
                        <div style={{ textAlign: 'center' }}>
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