import React, { Fragment, useEffect, useState, useHistory } from 'react'
import './NewBarber.css'
import {useSelector, useDispatch } from 'react-redux'
import {clearErrors, createBarber} from "../../redux/actions/barberAction"
import { useAlert } from 'react-alert'
import SideBar from './Sidebar'
import { NEW_BARBER_RESET } from '../../redux/constants/barberConstant'

const NewBarber = () => {
  // const history=useHistory()
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, success } = useSelector((state) => state.newBarber)

  const [name, setName] = useState('')
  const [worksAt, setWorksAt] = useState('')
  const [timings, setTimings]=useState('')
  const [experience, setExperience]=useState('')
  const [image, setImage]=useState('')
  const [imagePreview, setImagePreview]=useState('')


  

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (success) {
      alert.success('Barber Created Successfully')
      // history.push('/salonowner/dashboard')
      dispatch({ type: NEW_BARBER_RESET })
    }
  }, [dispatch, alert, error, success])

  const createBarberSubmitHandler = (e) => {
    e.preventDefault()
    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('worksAt', worksAt)
    myForm.set('timings', timings)
    myForm.set('experience', experience)
    myForm.set('image', image)

    // images.forEach((image) => {
    //   myForm.append('images', image)
    // })

    dispatch(createBarber(myForm ,worksAt ))
  }

  const createBarberImagesChange = (e) => {
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
          onSubmit={createBarberSubmitHandler}
          className="form"
          >
            <div className="title">Create Barber</div>
            <div className="input-container ic1">
              <input
                id="barbername"
                className="input"
                type="text"
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder=" "
              />
              <div className="cut"></div>
              <label htmlFor="name" className="placeholder">
                Barber Name
              </label>
            </div>
            <div className="input-container ic2">
              <input
                id="worksat"
                className="input"
                type="text"
                required
                value={worksAt}
                onChange={(e)=>setWorksAt(e.target.value)}
                placeholder=" "
              />
              <div className="cut"></div>
              <label htmlFor="worksat" className="placeholder">
                Works At
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
              <input id="experience" className="input" type="text"
              required
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
              placeholder=" " />
              <div className="cut cut-short"></div>
              <label htmlFor="experience" className="placeholder">
                Experience
              </label>
            </div>


            <div className="input-container ic2">
            <input
            className="input createProductFormFile"
                type="file"
                name="image"
                accept="image/*"
                multiple
                onChange={createBarberImagesChange}
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
               onChange={createBarberImagesChange}
               alt="Barber Preview" />


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