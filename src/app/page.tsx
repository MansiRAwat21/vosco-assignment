import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import React, { useState, useEffect } from 'react';
import fetchActivities from '../api/index';

// Define the interface for the Activity object
interface Activity {
  activity: string;
  type: string;
  participants: number;
}

// Import necessary CSS for Swiper component
import 'swiper/css';
import 'swiper/css/navigation';

// Define the Page component
export default function Page() {
  // Define state variable to store fetched data
  const [stackdata, setStackData] = useState<Activity[]>([]);

  // Fetch data using useQuery hook with a refetch interval of 5 seconds
  const { isLoading, error, data } = useQuery<Activity[], Error>(
    ['activities'],
    fetchActivities,
    { refetchInterval: 2000 }
  );

  // Update state when new data is fetched
  useEffect(() => {
    if (data) {
      setStackData(prevStackData => [...prevStackData, ...data]);
    }
  }, [data]);
  
  // Display loading message while data is being fetched
  if (isLoading) return (
    <div className='flex justify-center items-center h-96 '>
      <svg stroke="currentColor" className="animate-spin h-10 w-10 mr-3" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path>
      </svg>
    </div>
  );
  
  // Display error message if there is an error fetching data
  if (error) return <p>Error fetching activities: {error.message}</p>;

  // Define an array of light color shades for background colors
  const lightColors = ['#F0F4C3', '#BBDEFB', '#C8E6C9', '#FFCCBC', '#E1BEE7'];

  // Render the Swiper component with fetched data
  return (
    <section className='py-12'>
      <div className='p-4 w-full flex justify-center items-center '>
        <Swiper navigation modules={[Navigation]} className="">
          {stackdata.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='w-full flex justify-center items-center'>
                <div 
                  className='w-96 px-4 py-8 border border-gray-300 rounded-md text-center shadow-md mx-4 mb-4'
                  style={{ backgroundColor: lightColors[index % lightColors.length] }}
                >
                  {/* Display activity details */}
                  <h3>{item.activity}</h3>
                  <p>
                    <span>{item.type}</span> - {item.participants} participants
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
