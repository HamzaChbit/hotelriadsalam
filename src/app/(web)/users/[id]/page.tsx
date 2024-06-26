"use client"

import { getUserBookings } from "@/libs/apis"

import Image from "next/image"
import useSWR from "swr"

import { useState } from "react"
import { BsJournalBookmarkFill } from "react-icons/bs"
import { GiMoneyStack } from "react-icons/gi"
import Table from "@/components/Table/Table"
import Chart from "@/components/Chart/Chart"

import {  SignOutButton, useUser } from "@clerk/nextjs"

const UserDetails = (props:{params:{id:string}}) => {
    const {params:{id:userId}}=props
    const [currentNav, setCurrentNav] = useState<
    'bookings' | 'amount' | 'ratings'
  >('bookings');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const toggleRatingModal = () => setIsRatingVisible(prevState => !prevState);


  const { user } = useUser();
   
    const email = user?.emailAddresses[0]?.emailAddress;
    



  const fetchUserBooking = async () => getUserBookings(userId)


  const {data:userBookings,
    error,isLoading} = useSWR("/api/userbooking",fetchUserBooking) 



  
  
  return (
    <div className='container mx-auto px-2 md:px-4 py-10 mt-20 h-screen'>
    <div className='grid md:grid-cols-12 gap-10'>
    <div className='hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4'>
    <div className='md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden'>
        { user && 
  <Image
                  src={user.imageUrl}
             alt={user?.username || "user"}
             width={143}
             height={143}
             className='img scale-animation rounded-full'
           />
        }
  
     </div>
 
         <div className='font-normal text-left'>
           <h6 className='text-xl font-bold pb-3'>{user?.fullName}</h6>
         </div>
         <div className='flex items-center cursor-pointer text-red-400 hover:text-red-600'>
          <SignOutButton /> 
         </div>
     </div>


     <div className='md:col-span-8 lg:col-span-9'>
     <div className='flex items-center'>
           <h5 className='text-2xl font-bold mr-3'>Hello, {user?.fullName}</h5>
         </div>
         <div className='md:hidden w-14 h-14 rounded-l-full overflow-hidden'>
         { user && 
  <Image
                  src={user.imageUrl}
             alt={user?.username || "user"}
             width={143}
             height={143}
             className='img scale-animation rounded-full'
           />
        }
         </div>
   

        
         <div className='md:hidden flex items-center my-2 cursor-pointer text-red-400 hover:text-red-600' >
           <SignOutButton /> 
        
         </div>
         <nav className='sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7'>
     <ol
             className={`${
               currentNav === 'bookings' ? 'text-blue-600' : 'text-gray-700'
             } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
           >
             <li
               onClick={() => setCurrentNav('bookings')}
               className='inline-flex items-center cursor-pointer'
             >
               <BsJournalBookmarkFill />
               <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                 Current Bookings
               </a>
             </li>
           </ol>
           <ol
             className={`${
               currentNav === 'amount' ? 'text-blue-600' : 'text-gray-700'
             } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
           >
             <li
               onClick={() => setCurrentNav('amount')}
               className='inline-flex items-center cursor-pointer'
             >
               <GiMoneyStack />
               <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                 Amount Spent
               </a>
             </li>
           </ol>
     </nav>



     {currentNav === 'bookings' ? (
           userBookings && (
             <Table
               bookingDetails={userBookings}
               setRoomId={setRoomId}
               toggleRatingModal={toggleRatingModal}
             />
           )
         ) : (
           <></>
         )}

{currentNav === 'amount' ? (
           userBookings && <Chart userBookings={userBookings} />
         ) : (
           <></>
         )}
     </div>

     </div>
   
       
   </div>
  )
}

export default UserDetails