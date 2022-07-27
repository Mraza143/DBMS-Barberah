import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './Dashboard.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Doughnut} from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import { getSalonOwnerSalons } from '../../redux/actions/salonAction'
import { getSalonOwnerBarbers } from '../../redux/actions/barberAction'
import { getSalonOwnerUsers } from '../../redux/actions/userAction'
import { getSalonOwnerAppointments } from '../../redux/actions/appointmentAction'
// =====================================================




const DashboardCard=({link, text, counter})=>{
  return(
    <div class="bg-gray-100 flex items-center min-w-[16rem] text-center stats">
  <Link to={link} class="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
    <div class="flex justify-center items-center">
        <div>
              <h1 class="mt-5 text-2xl font-medium dashboardStyle1">{text}</h1>
        <p class="mt-2 text-2xl dashboardStyle1">{counter}</p>
        </div>
    </div>
  </Link>
</div>
  )
}



const Dashboard = () => {

  const dispatch = useDispatch()

  const {salonsCount } = useSelector((state) => state.salons)
  const { barbersCount } = useSelector((state) => state.barbers)
  const { usersCount } = useSelector((state) => state.allUsers)
  const {appointmentsCount}=useSelector((state)=>state.appointments)


  useEffect(() => {
    dispatch(getSalonOwnerSalons())
    dispatch(getSalonOwnerBarbers())
    dispatch(getSalonOwnerUsers())
    dispatch(getSalonOwnerAppointments())
  }, [dispatch])


  const doughnutState = {
    labels: ['Salons', 'Barbers'],
    datasets: [
      {
        backgroundColor: ['#390947', '#140970'],
        hoverBackgroundColor: ['#893b9c', '#2e36aa'],
        data: [salonsCount, barbersCount],
      },
    ],
  }



  return (
    <div className="dashboard">
      {/* <MetaData title="Dashboard - Admin Panel" /> */}
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1" className='text-5xl'>Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem error voluptas laudantium perferendis? Hic quam libero ipsam facilis dignissimos dolorum? Quisquam error sit placeat sed voluptatem alias architecto dolores deserunt.
            </p>
          </div>


          <div className="dashboardSummaryBox2">
            <DashboardCard  link="/salonowner/salons" text="Salons" counter={salonsCount}  />
            <DashboardCard  link="/salonowner/barbers" text="Barbers" counter={barbersCount}  />
            <DashboardCard  link="/salonowner/appointments" text="Appointments" counter={appointmentsCount}  />
            <DashboardCard  link="/salonowner/users" text="Users" counter={usersCount}  />
          </div>

        </div>


        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard