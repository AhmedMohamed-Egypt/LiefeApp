
import { useState } from 'react'
import { UseFood } from '../../../Context/FoodContext'
import Button from '../Button'
import Modal from '../Modal'

function FoodCart() {
  const {filterdMeals,currencySign,shaking} = UseFood()
  const [show,setShow] = useState(false)
  
  const noOfItems = filterdMeals.map((item)=>item.noOfItems).reduce((acc,cur)=>acc+cur,0)


  const items = filterdMeals.length > 0
  const handleCartItem=()=>{
   
    setShow(items&&true)
  }
    return (
      <>
       <Button className={`cartFoodBtn text-white boradius-28 ${shaking&&'shaking'}`} onClick={handleCartItem}>
        Cart {noOfItems}
        <i className="bi bi-cart d-inline-block ml-5"></i>
      
      </Button>
      {items&&show && <Modal  title={'Your Meals '} onClick={()=>setShow(false)} className={(filterdMeals.length>=5)&&'scrolling'}>
        {filterdMeals.map((item,index)=>{
      return(   <div key={index} className='d-flex  w-75 border-bottom mb-8'>
        <p className='mb-0 mr-10'>{index+1}-</p>
        <p className='mb-0 pb-8'>{item.mealName}</p>
       <p className='ml-auto mb-0 pb-8 weight-bold size-18'><span className='d-inline-block width20Px text-end'>{currencySign}</span> <span className='text-ceter d-inline-block width50Px'>{item.mealPrice}</span></p>
      </div>)
        })}
        </Modal>}
      </>
     
    )
}

export default FoodCart
