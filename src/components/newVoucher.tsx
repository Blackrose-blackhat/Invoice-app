
import { useNavigate } from 'react-router-dom'
const NewVoucher = () => {
    let navigate = useNavigate();
  return (
    <div className='flex flex-col py-20 px-10 w-full gap-20'>
        <div className='flex flex-row justify-between w-full items-center'>
            <p className='font-semibold text-xl'>New Payment Voucher</p>
            <div className='w-10 h-10 rounded-full bg-blue-300' />
        </div>

        <div className='bg-blue-100 w-full p-2 flex flex-row justify-end  '>
            <div className=' w-full gap-5 flex flex-row justify-end'>
                <button className='bg-green-500 text-neutral-100 font-semibold  p-1 rounded-sm '>Save</button>
                <button onClick={() => navigate("/home/payment")} className='bg-red-500 text-neutral-100 font-semibold p-1 rounded-sm '>Cancel</button>
            </div>
        </div>


        <div className=' gap-5 w-full p-2 bg-white shadow-sm shadow-neutral-400 flex flex-col items-center justify-center align-middle'>
            <div className='flex flex-row items-center gap-5  justify-center w-full'>
                <div className='flex flex-row justify-end  items-center gap-2 font-semibold w-1/2'>
                    <p className='text-neutral-800 '>Voucher Number : </p>
                    <input type='number' className=' border-2 border-neutral-300 rounded-md p-1' />
                </div>
                <div className='flex flex-row items-center gap-2 font-semibold w-1/2 justify-start'>
                    <p className='text-neutral-800'>Voucher Date : </p>
                    <input type='date' className='text-neutral-400  border-2 border-neutral-300 rounded-md p-1' />
                </div>
            </div>
            <div className='flex flex-row items-center gap-5  justify-center w-full'>
                <div className='flex flex-row justify-end  items-center gap-2 font-semibold w-1/2'>
                    <p className='text-neutral-800 '>Client Name : </p>
                    <input type='number' className=' border-2 border-neutral-300 rounded-md p-1' />
                </div>
                <div className='flex flex-row items-center gap-2 font-semibold w-1/2 justify-start'>
                    <p className='text-neutral-800'>Address : </p>
                    <textarea  className='text-neutral-400  border-2 border-neutral-300 rounded-md p-1' />
                </div>
            </div>
            <div className='flex flex-row items-center gap-5  justify-center w-full'>
                <div className='flex flex-row justify-end  items-center gap-2 font-semibold w-1/2'>
                    <p className='text-neutral-800 '>State : </p>
                    <input type='number' className=' border-2 border-neutral-300 rounded-md p-1' />
                </div>
                <div className='flex flex-row items-center gap-2 font-semibold w-1/2 justify-start'>
                    <p className='text-neutral-800'>GSTIN Number : </p>
                    <input type='text' className='text-neutral-400  border-2 border-neutral-300 rounded-md p-1' />
                </div>
            </div>
            <div className='flex flex-row items-center gap-5  justify-center w-full'>
                <div className='flex flex-row justify-end   items-center gap-2 font-semibold w-1/2'>
                    <p className='text-neutral-800 '>Place of supply : </p>
                    <input type='number' className=' border-2 border-neutral-300 rounded-md p-1' />
                </div>
                <div className='flex flex-row justify-end   items-center gap-2 font-semibold w-1/2'>
                    
                </div>
                
            </div>
            

        </div>
        

    </div>
  )
}

export default NewVoucher