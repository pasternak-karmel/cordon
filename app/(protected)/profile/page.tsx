import React from 'react'
import Image from 'next/image'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
  


export default function Profile() {
  return (
      <div className='flex flex-col gap-8 p-6'>
          <div className='flex flex-row justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm'>
              <div className='flex gap-3'>
                  <Image src="/userImage.png" alt='user' className='w-[90px] h-[90px] rounded-full' width={150} height={150} />
                  <div className='flex flex-col justify-around'>
                      <h6>Name</h6>
                      <h6>Plan name</h6>
                      <h6>Localisation</h6>
                      
                  </div>
              </div>
              <EditButton/>
              
          </div>
          <div className='flex flex-col justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm'>
              <div className='flex justify-between w-full items-center'>
                  <h6>Personnal Informations</h6>
                  <EditButton/>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                  <SectionInformation title='First Name' value='John' />
                  <SectionInformation title='Last Name' value='Doe' />
                  <SectionInformation title='Email' value='john.doe@example.com' />
                  <SectionInformation title='Phone' value='+1 123 456 7890' />
                  <SectionInformation title='Address' value='123 Main St, City, State, Zip' />

    
              </div>
          </div><div className='flex flex-col justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm'>
              <div className='flex justify-between w-full items-center'>
                  <h6>Address</h6>
                  <EditButton/>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                  <SectionInformation title='Contry' value='United Kingdom' />
                  <SectionInformation title='City/State' value='Leeds' />
                  <SectionInformation title='Postal Code' value='ERT 2354' />
                  <SectionInformation title='Tax ID' value='AD7890' />
                  

    
              </div>
          </div>
          <div className='flex justify-end'><Button variant="destructive">Log out</Button></div>
          
      
    </div>
  )
}

const EditButton = () => {
    return (
        <div className='w-fit h-fit px-4 py-2 border border-gray-200 flex flex-row justify-center items-center rounded-full cursor-pointer hover:bg-gray-50 hover:text-gray-600 flex-nowrap'>
            <h6 className="text-sm">Edit</h6>
                  <Edit size={18}/>
        </div>
        
    )

    
}
const SectionInformation = ({ title, value }: { title: string, value: string }) => {
        return (
            <div className='flex flex-col gap-1'>
                <h6 className='text-sm text-gray-400'>{title}</h6>
                <h6>{value}</h6>
            </div>
        )
    }