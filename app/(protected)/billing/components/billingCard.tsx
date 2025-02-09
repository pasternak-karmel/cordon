import { Button } from '@/components/ui/button'
import { CircleCheck } from 'lucide-react'
import React from 'react'

interface BillingCardProps {
  plan: string
  amount: number
  advantages: string[]
  isActive: boolean
 
}
export function BillingCard({plan, amount, advantages, isActive} : BillingCardProps) {
  return (
    <div className={`${isActive ? "bg-white" : "bg-gray-100"} w-[380px] h-[280px] flex flex-col justify-between items-center gap-3 p-5 border border-gray-200 shadow-sm rounded-xl`}>
      <div className='flex justify-between items-center w-full'>
        <h2 className="text-2xl font-semibold">{plan}</h2>
        <p className="text-sm text-gray-500">${amount}/month</p>
      </div>
      <ul className='flex flex-col gap-2 w-full'>
        {advantages.map((advantage, index) => (
          <li key={index} className="text-sm text-gray-700 flex flex-row gap-3 items-center">
            <CircleCheck color='#6b7280 ' />
            <h6>
            {advantage}

            </h6>
          </li>
        ))}
      </ul>

      <Button className="bg-transparent w-full text-black border border-black hover:bg-gray-500">{isActive ? "Current plan" : "Switch to the plan"}</Button>
      
    </div>
  )
}
