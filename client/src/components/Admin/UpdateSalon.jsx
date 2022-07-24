// import React, { Fragment, useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// // import {
// //   clearErrors,
// //   updateProduct,
// //   getProductDetails,
// // } from '../../actions/productAction'

// import { getAdminSalonDetails, clearErrors, updateSalon } from '../../redux/actions/salonAction'
// import { UPDATE_SALON_RESET } from '../../redux/constants/salonConstant'

// import { useAlert } from 'react-alert'
// import SideBar from './Sidebar'
// import "./UpdateSalon.css"
// import { useParams } from 'react-router-dom'

// const UpdateSalon = () => {
//     const {id}= useParams()
//   const dispatch = useDispatch()
//   const alert = useAlert()

//   const { error, salon } = useSelector((state) => state.adminSalonDetails)

//   const { loading, error: updateError, isUpdated } = useSelector(
//     (state) => state.adminSalonAddDel,
//   )

//   const [name, setName] = useState('')
//   const [location, setLocation] = useState('')
//   const [timings, setTimings] = useState('')
  

//   const salonId = id



//   useEffect(() => {
//     if (salon && salon.id !== salonId) {
//       dispatch(getAdminSalonDetails(salonId))
//     } else {
//       setName(salon.name)
//       setLocation(salon.location)
//       setTimings(salon.timings)
      
//     }
//     if (error) {
//       alert.error(error)
//       dispatch(clearErrors())
//     }

//     if (updateError) {
//       alert.error(updateError)
//       dispatch(clearErrors())
//     }

//     if (isUpdated) {
//       alert.success('Salon Updated Successfully')
//     //   history.push('/admin/products')
//       dispatch({ type: UPDATE_SALON_RESET })
//     }
//   }, [
//     dispatch,
//     alert,
//     error,
//     history,
//     isUpdated,
//     salonId,
//     salon,
//     updateError,
//   ])

//   const updateSalonSubmitHandler = (e) => {
//     e.preventDefault()

//     const myForm = new FormData()

//     myForm.set('name', name)
//     myForm.set('location', location)
//     myForm.set('timings', timings)
    
    
//     dispatch(updateProduct(salonId, myForm))
//   }



//   return(
//     <Fragment>
//     <div className="dashboard">
//       <SideBar />
//       <div className="newProductContainer">
//         {/* --------------- */}

//         <form 
//         encType='multipart/form-data'
//         onSubmit={updateSalonSubmitHandler}
//         className="form"
//         >
//           <div className="title">Update Salon</div>
//           <div className="input-container ic1">
//             <input
//               id="salonname"
//               className="input"
//               type="text"
//               required
//               value={name}
//               onChange={(e)=>setName(e.target.value)}
//               placeholder=" "
//             />
//             <div className="cut"></div>
//             <label htmlFor="salonname" className="placeholder">
//               Salon Name
//             </label>
//           </div>
          
//           <div className="input-container ic2">
//             <input
//              id="timings" 
//              className="input"
//               type="text"
//               required
//               value={timings}
//               onChange={(e)=>setTimings(e.target.value)}
//               placeholder=" " />
//             <div className="cut cut-short"></div>
//             <label htmlFor="timings" className="placeholder">
//               Timings
//             </label>
//           </div>
//           <div className="input-container ic2">
//             <input id="location" className="input" type="text"
//             required
//             value={location}
//             onChange={(e)=>setLocation(e.target.value)}
//             placeholder=" " />
//             <div className="cut cut-short"></div>
//             <label htmlFor="location" className="placeholder">
//               Location
//             </label>
//           </div>



//           <button type="submit" className="submit" disabled={loading ? true : false} >
//             Submit
//           </button>
//         </form>

//         {/* --------------- */}
//       </div>
//     </div>
//   </Fragment>
// )
  

 
// }

// export default UpdateSalon