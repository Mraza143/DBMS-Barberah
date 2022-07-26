import React from 'react'
import { useParams } from 'react-router-dom'
import profilePng from '/images/Profile.png'
import { useAlert } from 'react-alert'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearErrors,
  getAllBarbersDetails,
  getAllBarbersUrl,
} from '../redux/actions/barberDetailsAction'
//import {getAllSalonUrl} from '../redux/actions/salonDetailsAction'
import {
  createAppointmentForCustomers,
  getAllAppointments,
} from '../redux/actions/appointmentAction'
import {
  getAllReviews,
  createbarberReview,
  getAllReviewsAverage,
} from '../redux/actions/reviewAction'
import { Rating } from '@material-ui/lab'

import './BarberProfile.css'
import { CREATE_REVIEW_RESET } from '../redux/constants/reviewConstant'
import { NEW_APPOINTMENT_RESET } from '../redux/constants/appointmentsConstant'

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  }

  return (
    <div className="reviewCard rounded-lg">
      <img src={profilePng} alt="User" />
      <p>{review.customerName}</p>

      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

const BarberProfile = () => {
  //const [barber, setbarber]= useState({});
  const { id, name, sname } = useParams()
  // console.log(id)
  const alert = useAlert()
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  //const [ratings,setRatings]=useState(10);
  const [comment, setComment] = useState('')

  //const [barberId,setbarberId] = useState(id)
  const { user } = useSelector((state) => state.user)
  const { barber } = useSelector((state) => state.barber)
  //const user_id = user.id;

  // Appointment States
  const [customerName, setCustomerName] = useState(user[0]?.name)
  const [user_id, setUserId] = useState(user[0]?.id)
  const [barberName, setBarberName] = useState(barber?.name)
  const [barber_id, setBarberId] = useState(barber?.id)
  const [salonName, setSalonName] = useState(barber?.worksAt)
  const [date, setDate] = useState('')
  const [price, setPrice] = useState(0)

  const priceOptions = [500, 1000, 2000]
  const { appointments } = useSelector((state) => state.appointments)
  const { reviews } = useSelector((state) => state.reviews)
  //const [average,setAverage]=  useState(reviews[2]);

  console.log(appointments)
  const {
    newAppointment,
    error: appointmentError,
    success: appointmentSuccess,
  } = useSelector((state) => state.newAppointment)
  const { average } = useSelector((state) => state.average)
  console.log('average is' + average)

  //const {burl} =useSelector((state) => state.burl)

  const { success: reviewSuccess, error: reviewError } = useSelector(
    (state) => state.newReview,
  )

  //console.log(`average is `)
  //const {name}= barber;
  //console.log("User " +user)
  //console.log("Barber name "+ barber.name + " User name " +user.name)

  const options = {
    size: 'large',
    value: barber?.ratings,
    readOnly: true,
    precision: 0.5,
  }

  const appointmentSubmitHandler = (e) => {
    e.preventDefault()
    setBarberName(barber.name)
    setSalonName(barber.worksAt)

    dispatch(
      createAppointmentForCustomers({
        customerName,
        barberName,
        salonName,
        date,
        price,
        user_id,
      }),
    )
    console.log(barber.name + barber.worksAt + name)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createbarberReview({
        barberName,
        customerName,
        rating,
        comment,
        barber_id,
      }),
    )
  }

  useEffect(() => {
    if (reviewError) {
      alert.error(reviewError)
      dispatch(clearErrors())
    }

    if (reviewSuccess) {
      alert.success('Review Submitted Successfully')
      dispatch({ type: CREATE_REVIEW_RESET })
    }

    if (appointmentError) {
      alert.error(appointmentError)
      dispatch(clearErrors())
    }

    if (appointmentSuccess) {
      alert.success('Appointment Booked Successfully')
      dispatch({ type: NEW_APPOINTMENT_RESET })

      // dispatch({ type: CREATE_REVIEW_RESET })
    }

    dispatch(getAllBarbersDetails(id))
    dispatch(getAllAppointments(id, name, sname))
    dispatch(getAllReviews(id))
    console.log(id, name, sname)

    dispatch(getAllReviewsAverage(id))
    //dispatch(getAllBarbersUrl(id))
    //dispatch(getBarbersAverage(id,ratings))
    //console.log(dispatch(getAllReviewsAverage(id)))
  }, [
    dispatch,
    id,
    name,
    sname,
    alert,
    reviewError,
    reviewSuccess,
    appointmentError,
    appointmentSuccess,
  ])
  // console.log(appointments)
  return (
    <>
      <div className="flex flex-col gradient-bg-welcome pb-[4rem]">
        <div className="gradient-bg-welcome py-[4rem] px-0 flex md:flex-row flex-col w-full justify-evenly items-center">
          <div
            className=" flex flex-[0.4]
          2xl:min-w-[750px]
          sm:min-w-[470px]
          flex-col rounded-md hover:shadow-2xl barberStyle3"
          >
            <div className="flex flex-col justify-evenly items-center w-full mt-3">
              <div className="flex flex-col justify-center items-center w-full">
                <p className="text-white text-[1.5rem] font-bold barberStyle4">
                  Experience: {barber?.experience} years
                </p>
                <p className="text-[1.5rem] text-white mb-[5px] font-bold barberStyle4">
                  Ratings: {average} /5
                </p>
              </div>
              <div className="w-[28rem] rounded-full bg-[#b078b7]">
                <img
                  src={barber?.image}
                  alt="nature"
                  className="w-[28rem] rounded-full h-full sm:h-full sm:px-12 shadow-lg object-cover"
                />
              </div>
              <div className="bg-black py-[13px] px-[8px] min-w-[50%] rounded-3xl -mt-5 mb-[10px] shadow-2xl text-center barberStyle1">
                <p className="font-bold barberStyle2">{barber?.name}</p>
              </div>
            </div>
            {/* ------------ */}
          </div>
          <div className="text-[#37c7da] flex-[0.3] ">
            {/* ----------------------- */}
            <div>
              <div className="max-w-md bg-white shadow-lg rounded-lg md:max-w-xl ">
                <div className="md:flex">
                  <div className="w-full px-7 py-8">
                    <div className="flex flex-row mb-[10px]">
                      <h2 className="text-[2.2rem] font-semibold mx-auto font__style text-[#0f0e13]">
                        Book Now!
                      </h2>
                    </div>

                    <div className="relative pb-5">
                      <input
                        type="text"
                        name="cname"
                        value={customerName}
                        onChange={(e) => e.target.value}
                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                        placeholder="Customer Name"
                      />
                    </div>
                    <div className="relative pb-5">
                      <input
                        type="text"
                        name="bname"
                        value={barber?.name}
                        readOnly
                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                        placeholder="Barber Name"
                      />
                    </div>
                    <div className="relative pb-5">
                      <input
                        type="text"
                        name="sname"
                        value={barber?.worksAt}
                        readOnly
                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                        placeholder="Salon Name"
                      />
                    </div>
                    <div className="relative pb-5">
                      <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                        placeholder="Date"
                      />
                    </div>
                    <div className="relative pb-5">
                      <select
                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                        onChange={(e) => setPrice(e.target.value)}
                      >
                        <option value="">Select your Package : </option>
                        {priceOptions.map((priceOpt) => (
                          <option key={priceOpt} value={priceOpt}>
                            {priceOpt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={appointmentSubmitHandler}
                        type="button"
                        className="h-12 w-full rounded font-medium text-base bg-[#0f0e13] text-white"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------- */}
          </div>
        </div>
        {/* ----------------------- */}
        {
          appointments.length>0 && <>
          <div className="w-full flex flex-col content-center items-center pt-[2rem]">
          <h1 className="text-white text-center barberStyle5">Appointments For this Barber</h1>
          <div class="flex flex-col w-[50%]">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-xl font-medium text-white bg-[#49004e] px-6 py-4 text-left"
                        >
                         Date
                        </th>
                        <th
                          scope="col"
                          class="text-xl font-medium  text-white bg-[#49004e] px-6 py-4 text-left"
                        >
                          Customer
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment, i) => (
                        <tr
                          className=" bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                          key={i}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-medium font-medium text-gray-900 border-2">
                            {appointment?.date}
                          </td>
                          <td className="text-medium text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-2">
                            {appointment?.customerName}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* --------------- */}
        </div>
          </>
        }
        
      </div>

      {/*Packages Section*/}
      <h1 className="text-center mt-8 barberStyle5">Packages Details</h1>
      <div className="flex flex-row space-even justify-around flex-wrap">
        <div className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-6 mb-8 text-center">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Basic Plan
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white mx-16">
            <span className="text-3xl font-semibold">Rs &nbsp;</span>
            <span className="text-5xl font-extrabold tracking-tight">500</span>
            <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
              Only
            </span>
          </div>

          <ul role="list" className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Speciality Haircut
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Beard Maintenance
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Eye Brows
              </span>
            </li>
            <li className="flex space-x-3 line-through decoration-gray-500">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">
                Face Mask
              </span>
            </li>
            <li className="flex space-x-3 line-through decoration-gray-500">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">
                Nails & Hair Removal
              </span>
            </li>
            <li className="flex space-x-3 line-through decoration-gray-500">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">
                Face & Head Massage
              </span>
            </li>
            <li className="flex space-x-3 line-through decoration-gray-500">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">
                Hair Coloring
              </span>
            </li>
          </ul>
        </div>

        <div className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-6 mb-8 text-center">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Standard Plan
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white mx-14">
            <span className="text-3xl font-semibold">Rs &nbsp;</span>
            <span className="text-5xl font-extrabold tracking-tight">1000</span>
            <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
              Only
            </span>
          </div>

          <ul role="list" className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Speciality Haircut
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Beard Maintenance
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Eye Brows
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Face Mask
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Nails & Hair Removal
              </span>
            </li>
            <li className="flex space-x-3 line-through decoration-gray-500">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">
                Face & Head Massage
              </span>
            </li>
            <li className="flex space-x-3 line-through decoration-gray-500">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">
                Hair Coloring
              </span>
            </li>
          </ul>
        </div>

        <div className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-6 mb-8 text-center">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Premium plan
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white mx-14">
            <span className="text-3xl font-semibold">Rs &nbsp;</span>
            <span className="text-5xl font-extrabold tracking-tight">2000</span>
            <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
              Only
            </span>
          </div>

          <ul role="list" className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Speciality Haircut
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Beard Maintenance
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Eye Brows
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Face Mask
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Nails & Hair Removal
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Face and Head Massage
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Hair Coloring
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* // ------------ Reviews form */}

      {/*<div className="bg-black pt-12  flex flex-col w-full justify-center items-center py-8">
        
            
          </div>*/}

      {/* // ----------------- */}
      <div>
        <div>
          <div className="flex flex-col sm:flex-row bg-black justify-around">
            <div className="min-w-md  bg-white shadow-lg rounded-lg md:max-w-xl my-14 w-full sm:w-1/2">
              <div className="md:flex font-cursive">
                <div className="w-full px-6 py-6 flex flex-col ">
                  <div className="flex flex-row mb-4">
                    <h2 className="text-2xl font-semibold font__style text-[#602239] text-center">
                      Submit Your Review For {barber?.name}
                    </h2>
                  </div>

                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="7"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    type="button"
                    class="h-12 w-full rounded font-larger text-medium bg-[#602239] text-white"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
           
          </div>
          <div className="bg-white">
            {reviews[0] != null ? (
              <>
                <h1 className="reviews__title text-center">
                  Reviews for {barber?.name} 
                </h1>
                <div className="flex flex-row space-even justify-around flex-wrap">
                  <div className="reviews">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="noReviews text-white">No Reviews Yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BarberProfile
