import { Plus, TvMinimalPlay } from 'lucide-react'
import React from 'react'

export default function SubscriptionsCategory() {
  return (
      <div className='bg-white  rounded-md shadow-sm border border-gray-200 p-4'>
          <div className='flex justify-between pb-6 border-b border-gray-200 p-4'>
              <h6>Subscriptions ($500)</h6>
              <h6>March 2025</h6>

              
          </div>
          <div className='flex flex-row flex-wrap gap-2 mt-4'>
          {[1, 2, 3, 4,5,6,7,8].map((_, index) => (
               <Category key={index} />
          ))}
              <div className="border border-gray-200 p-4 rounded-xl shadow-sm w-[200px] bg-white flex flex-row h-[80px] gap-3 hover:bg-gray-50 cursor-pointer">
            <div className='w-10 h-10 border border-gray-300 border-dashed rounded-full flex justify-center items-center'>
                <Plus size={25} color='black'/>
                  </div>
                  <div className='flex items-center'>
            <h6 className='text-sm'>Add Category</h6>
                      
                  </div>
        </div>
          </div>
          
      
    </div>
  )
}
const Category = () => {
    return (
        <div className="border border-gray-200 p-4 rounded-xl shadow-sm w-[200px] bg-white flex flex-row h-[80px] gap-3 hover:bg-gray-50">
            <div className='w-10 h-10 bg-orange-200 rounded-full flex justify-center items-center'>
                <TvMinimalPlay size={25} color='white'/>
            </div>
            <div className='flex flex-col'>
                <h6 className='text-sm'>Netflix</h6>
                <p className='text-sm text-gray-500'>Monthly</p>
            </div>
        </div>
    )
}