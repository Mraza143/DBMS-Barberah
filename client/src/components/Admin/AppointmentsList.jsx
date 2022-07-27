import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import './AppointmentsList.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

import SideBar from './Sidebar'
// import { clearErrors, getSalonOwnerSalons } from '../../redux/actions/salonAction'
import { getSalonOwnerAppointments, clearErrors } from '../../redux/actions/appointmentAction'

const BarbersList = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, appointments } = useSelector((state) => state.appointments)


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }


    dispatch(getSalonOwnerAppointments())
  }, [dispatch, alert, error,history])

  const columns = [
    { field: 'id', headerName: 'Appointment ID', minWidth: 150, flex: 0.4 },

    {
      field: 'customerName',
      headerName: 'Customer Name',
      minWidth: 100,
      flex: 0.4,
    },

    {
      field: 'barberName',
      headerName: 'Barber Name',
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: 'salonName',
      headerName: 'Salon Name',
    //   type: 'number',
      minWidth: 100,
      flex: 0.4,
    },

    {
        field: 'date',
        headerName: 'Date',
        minWidth: 100,
        flex: 0.3,
      },

      {
        field: 'price',
        headerName: 'Price',
        minWidth: 100,
        flex: 0.3,
      },


  ]


  const rows = []

  appointments &&
  appointments.forEach((item) => {
      rows.push({
        id: item.id,
    customerName:item.customerName,
    barberName:item.barberName,
    salonName:item.salonName,
    date:item.date,
    price:item.price,
      })
    })

  return (
    <Fragment>
      {/* <MetaData title={`ALL PRODUCTS - Admin`} /> */}

      <div className="dashboard">
        <SideBar />
        <div className="appointmentListContainer">
          <h1 id="appointmentListHeading">All Appointments</h1>

          <DataGrid
            // rows={rows}
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="appointmentListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default BarbersList