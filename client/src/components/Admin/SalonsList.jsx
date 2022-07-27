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
    // {
    //   field: 'worksAt',
    //   headerName: 'Works At',
    // //   type: 'number',
    //   minWidth: 150,
    //   flex: 0.5,
    // },

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

    // {
    //   field: 'actions',
    //   flex: 0.3,
    //   headerName: 'Actions',
    //   minWidth: 150,
    //   type: 'number',
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <Fragment>
    //         {/* <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}> */}
    //         <Link to={`salonowner/salon/${params.getValue(params.id, 'id')}`}>
    //           <EditIcon />
    //         </Link>

    //         <Button
    //           onClick={() =>
    //             // deleteProductHandler(params.getValue(params.id, 'id'))
    //             deleteSalonHandler
    //           }
    //         >
    //           <DeleteIcon />
    //         </Button>
    //       </Fragment>
    //     )
    //   },
    // },

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
      {/* <MetaData title={`ALL PRODUCTS - Admin`} /> */}

      <div className="dashboard">
        <SideBar />
        <div className="salonListContainer">
          <h1 id="salonListHeading">All Salons</h1>

          <DataGrid
            // rows={rows}
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="salonListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default BarbersList