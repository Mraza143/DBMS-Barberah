import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import './SalonsList.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

import SideBar from './Sidebar'
import { clearErrors, getSalonOwnerSalons } from '../../redux/actions/salonAction'

const BarbersList = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, salons } = useSelector((state) => state.salons)


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }


    dispatch(getSalonOwnerSalons())
  }, [dispatch, alert, error,history])

  const columns = [
    { field: 'id', headerName: 'Salon ID', minWidth: 100, flex: 0.5 },

    {
      field: 'name',
      headerName: 'Salon Name',
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
      field: 'location',
      headerName: 'Location',
    //   type: 'number',
      minWidth: 150,
      flex: 0.5,
    },

   
  ]


  const rows = []

  salons &&
  salons.forEach((item) => {
      rows.push({
        id: item.id,
    name:item.name,
    timings:item.timings,
    location:item.location
      })
    })

  return (
    <Fragment>

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Salons</h1>

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

export default BarbersList