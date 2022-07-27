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
// import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction'
// import { DELETE_USER_RESET } from '../../constants/userConstant'

const UsersList = ({ history }) => {
  const dispatch = useDispatch()

  const alert = useAlert()

  const { error, users } = useSelector((state) => state.allUsers)

//   const { error: deleteError, isDeleted, message } = useSelector(
//     (state) => state.profile,
//   )

//   const deleteUserHandler = (id) => {
//     dispatch(deleteUser(id))
//   }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    // if (deleteError) {
    //   alert.error(deleteError)
    //   dispatch(clearErrors())
    // }

    // if (isDeleted) {
    //   alert.success(message)
    //   history.push('/admin/users')
    //   dispatch({ type: DELETE_USER_RESET })
    // }

    dispatch(getSalonOwnerUsers())

  },[dispatch, alert, error, history])
//    [dispatch, alert, error, deleteError, history, isDeleted, message])

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
    //   cellClassName: (params) => {
    //     return params.getValue(params.id, 'role') === 'salonowner'
    //       ? 'greenColor'
    //       : 'redColor'
    //   },
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/salonowner/user/${params.getValue(params.id, 'id')}`}>
            {/* <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}> */}
              <EditIcon />
            </Link>

            <Button
            //   onClick={() =>
            //     deleteUserHandler(params.getValue(params.id, 'id'))
            //   }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      },
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