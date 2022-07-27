import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import './BarbersList.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import SideBar from './Sidebar'
import { clearErrors, getSalonOwnerBarbers } from '../../redux/actions/barberAction'

const BarbersList = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, barbers } = useSelector((state) => state.barbers)


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }


    dispatch(getSalonOwnerBarbers())
  }, [dispatch, alert, error,history])

  const columns = [
    { field: 'id', headerName: 'Barber ID', minWidth: 100, flex: 0.5 },

    {
      field: 'name',
      headerName: 'Barber Name',
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: 'worksAt',
      headerName: 'Works At',
    //   type: 'number',
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: 'timings',
      headerName: 'Timings',
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: 'experience',
      headerName: 'Experience',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

   
  ]


  const rows = []

  barbers &&
  barbers.forEach((item) => {
      rows.push({
        id: item.id,
    name:item.name,
    worksAt:item.worksAt,
    timings:item.timings,
    experience:item.experience
      })
    })

  return (
    <Fragment>

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Barbers</h1>

          <DataGrid
            // rows={rows}
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

export default BarbersList