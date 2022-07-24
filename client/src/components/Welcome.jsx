import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import imageOne from "/images/b5.jpg";
import imageTwo from "/images/b4.jpg";
import imageThree from "/images/b3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  return (
    <div className="flex w-full justify-center items-center " id="About Us">
      <div className="flex md:flex-row flex-col  items-start justify-between md:px-20 pt-32 px-4">
        <div className="flex flex-[0.65] justify-start items-start flex-col mf:mr-10">
          {/* <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1"> */}
          <h1 className="text-white font-bold text-6xl font-sans">
            Find the best Barber <br/> Near your area
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            No need to waste time in barber's shop now..
            Make a booking and visit the shop in your desired time
          </p>
          
            


          <div className=" grid sm:grid-cols-3 grid-cols-2 w-[80%] mt-20">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliable
            </div>
            <div className={companyCommonStyles}>Scalable</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Efficient
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Quick
            </div>
            <div className={companyCommonStyles}>No Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Secure
            </div>
          </div>

          
        </div>
        

        <div className="flex flex-col flex-[0.4] items-center justify-center w-full">

          <div className="p-5 sm:w-96 sm:mb-12 md:py-4 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <Carousel  autoPlay={false}  interval={2000} infiniteLoop={true} dynamicHeight={false} width={300} >
                <div>
                    <img src={imageOne} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={imageTwo} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={imageThree} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
          </div>
          


      </div>
      </div>
      </div>

  );
};

export default Welcome;


