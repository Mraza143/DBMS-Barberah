import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import SideBar from './Sidebar'
import "./UpdateUser.css"
import { UPDATE_USER_RESET } from '../../redux/constants/userConstant'
import {  salonOwnerUpdateUser, clearErrors } from '../../redux/actions/userAction'
import { useParams } from 'react-router-dom'


const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const {id: userId}=useParams()

//   const { loading, error, user } = useSelector((state) => state.userDetails)

  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.userProfile,
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    // if (user && user.id === userId) {
    //   dispatch(getSalonOwnerUserDetails(userId))
    // } else {
    //   setName(user.name)
    //   setEmail(user.email)
    //   setRole(user.role)
    // }

   
        // setName(user.name)
        // setEmail(user.email)
        // setRole(user.role)


    // if (error) {
    //   alert.error(error)
    //   dispatch(clearErrors())
    // }

    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('User Updated Successfully')
    //   history.push('/admin/users')
      dispatch({ type: UPDATE_USER_RESET })
    }
  }, [dispatch, alert, history, isUpdated, updateError, userId])

  const updateUserSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('role', role)

    dispatch(salonOwnerUpdateUser(userId, myForm))
  }

  return (
    <Fragment>
      {/* <MetaData title="Update User" /> */}
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
        <form
              className="form"
              onSubmit={updateUserSubmitHandler}
            >
              <div className="title">Update User</div>


              <div className="input-container ic1">
              <input
                id="username"
                className="input"
                type="text"
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder=" "
              />
              <div className="cut"></div>
              <label htmlFor="username" className="placeholder">
                Name
              </label>
            </div>


            <div className="input-container ic1">
              <input
                id="email"
                className="input"
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder=" "
              />
              <div className="cut"></div>
              <label htmlFor="email" className="placeholder">
                Email
              </label>
            </div>

                <select className='selectStyle input-container ic1' value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="salonowner">Salon Owner</option>
                  <option value="customer">Customer</option>
                </select>


              <button type="submit" className="submit" disabled={
                  updateLoading ? true : false || role === '' ? true : false
                } >
              Update
            </button>

            </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser