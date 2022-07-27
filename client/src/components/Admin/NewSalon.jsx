import React, { Fragment, useEffect, useState, useHistory } from 'react'
import './NewSalon.css'
import {useSelector, useDispatch } from 'react-redux'
import { clearErrors, createSalon } from '../../redux/actions/salonAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import SideBar from './Sidebar.jsx'
import { NEW_SALON_RESET } from '../../redux/constants/salonConstant'

const NewBarber = () => {
  // const history=useHistory()
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, success } = useSelector((state) => state.newSalon)

  const [name, setName] = useState('')
  const [timings, setTimings]=useState('')
  const [location, setLocation]=useState('')
  const [latitude, setLatitude] = useState('')
  const [langitude, setLangitude] = useState('')
  

  const [image, setImage]=useState('')
  const [imagePreview, setImagePreview]=useState('')

  

  useEffect(() => {
    if (error) {
      alert.error(error)
      console.log(error)
      dispatch(clearErrors())
    }
    if (success) {
      alert.success('Salon Created Successfully')
      // history.push('/salonowner/dashboard')
      dispatch({ type: NEW_SALON_RESET })
    }
  }, [dispatch, alert, error, success])

  const createSalonSubmitHandler = (e) => {
    e.preventDefault()
    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('timings', timings)
    myForm.set('location', location)
    myForm.set('image', image)
    myForm.set('latitude',latitude)
    myForm.set('langitude',langitude)

    // images.forEach((image) => {
    //   myForm.append('images', image)
    // })

    dispatch(createSalon(myForm))
  }




  const createSalonImagesChange = (e) => {
   
    if (e.target.name === 'image') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result)
          setImage(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }

  }





  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {/* --------------- */}

          <form 
          encType='multipart/form-data'
          onSubmit={createSalonSubmitHandler}
          className="form"
          >
            <div className="title">Create Salon</div>
            <div className="input-container ic1">
              <input
                id="salonname"
                className="input"
                type="text"
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder=" "
              />
              <div className="cut"></div>
              <label htmlFor="salonname" className="placeholder">
                Salon Name
              </label>
            </div>
            
            <div className="input-container ic2">
              <input
               id="timings" 
               className="input"
                type="text"
                required
                value={timings}
                onChange={(e)=>setTimings(e.target.value)}
                placeholder=" " />
              <div className="cut cut-short"></div>
              <label htmlFor="timings" className="placeholder">
                Timings
              </label>
            </div>
            <div className="input-container ic2">
              <input id="location" className="input" type="text"
              required
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              placeholder=" " />
              <div className="cut cut-short"></div>
              <label htmlFor="location" className="placeholder">
                Location
              </label>
            </div>
            <div className="input-container ic2">
              <input id="latitude" className="input" type="text"
              required
              value={latitude}
              onChange={(e)=>setLatitude(e.target.value)}
              placeholder=" " />
              <div className="cut cut-short"></div>
              <label htmlFor="latitude" className="placeholder">
                Latitiude
              </label>
            </div>
            <div className="input-container ic2">
              <input id="langitude" className="input" type="text"
              required
              value={langitude}
              onChange={(e)=>setLangitude(e.target.value)}
              placeholder=" " />
              <div className="cut cut-short"></div>
              <label htmlFor="langitude" className="placeholder">
                Langitude
              </label>
            </div>


            
            <div className="input-container ic2">
            <input
            className="input createProductFormFile"
                type="file"
                name="image"
                accept="image/*"
                multiple
                onChange={createSalonImagesChange}
              />
              <div className="cut cut-short"></div>
              <label htmlFor="email" className="placeholder">
                Image File
              </label>
            </div>


            <div className="input-container ic2 product_preview">
            <div
            className="input createProductFormImage">
              <img
              src={imagePreview}
              name="imagePreview"
              onChange={createSalonImagesChange}
              alt="Salon Preview" 
              />
{/* {
  imagesPreview.map((image, index)=>(
    <img key={index} src={image} alt="Barber Preview"/>
  ))
} */}
            </div>
            </div>




            <button type="submit" className="submit" disabled={loading ? true : false} >
              Submit
            </button>
          </form>

          {/* --------------- */}
        </div>
      </div>
    </Fragment>
  )
}

export default NewBarber