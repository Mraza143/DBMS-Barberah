import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import './UsersList.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SideBar from './Sidebar'
import { getSalonOwnerUsers, clearErrors } from '../../redux/actions/userAction'

const UsersList = ({ history }) => {
  const dispatch = useDispatch()

  const alert = useAlert()

  const { error, users } = useSelector((state) => state.allUsers)



  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(getSalonOwnerUsers())

  },[dispatch, alert, error, history])

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 100, flex: 0.3 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: 'email',
      headerName: 'Email',
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
   
    },

   
  ]

  const rows = []

  users &&
    users.forEach((item) => {
      rows.push({
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
      })
    })

  return (
    <Fragment>

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default UsersList