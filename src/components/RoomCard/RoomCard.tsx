import { Room } from "@/models/room";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
    room: Room;
  };
  const RoomCard: FC<Props> = props => {
    const {
      room: { coverImage, name, price, type, description, slug, isBooked },
    } = props;
  

    return (
      
  <div className='rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black border-2 border-tertiary-dark p-2'  >
        <div className='h-60 cursor-pointer overflow-hidden '>
               <Link href={`/rooms/${slug.current}`} >  
                <Image
            src={coverImage}
            alt={name}
            width={250}
            height={250}
            className='img scale-animation rounded-sm'
          />
        </Link>
        </div>
     
       
  
        <div className='p-2 bg-white '>
          <div className=' text-xl font-semibold'>
            <p>{name}</p>
           <p>$ {price}</p>
      
          </div>
  
          <p className='pt-2 text-xs'>{type} Room</p>
  
          <p className='pt-3 pb-6'>{description.slice(1, 100)}...</p>
  
          <Link
            href={`/rooms/${slug.current}`}
            className='bg-tertiary-dark inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500'
          >
            {isBooked ? 'BOOKED' : 'BOOK NOW'}
          </Link>
        </div>
      </div>

    
    );
  };
  
export default RoomCard