
import { useEffect, useState } from 'react'
import { UseFood } from '../../../Context/FoodContext'
import Button from '../Button'
import Modal from '../Modal'

function FoodCart() {
  const {filterdMeals,currencySign,shaking,increaseItems,decrement,deleteItem} = UseFood()
  const [show,setShow] = useState(false)
  
  const noOfItems = filterdMeals.map((item)=>item.noOfItems).reduce((acc,cur)=>acc+cur,0)

  const totalPrice = filterdMeals.map((item)=>{return {num:+item.noOfItems,price:+item.mealPrice}}).reduce((acc,cur)=>acc+(cur.num*cur.price),0).toFixed(1)

  const items = filterdMeals.length > 0
  
  useEffect(()=>{
    setShow(items.length===0&&false)
  },[items])


  
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
       <>
       {filterdMeals.map((item,index)=>{
      return(  
       <div key={index} className='d-flex   mb-8 justify-content-between' >
      <div className='w-75 border-bottom d-flex align-items-center'>
      <p className='mb-0 mr-10'>{index+1}-</p>
        <p className='mb-0  fst-italic weight-500 w-150' >{item.mealName}</p>
        <p className='mb-0 ml-15 noOfItems size-15' >{item.noOfItems}</p>
       <p className='ml-auto mb-0  weight-bold size-18'><span className='d-inline-block width20Px text-end'>{currencySign}</span> <span className='text-ceter d-inline-block width50Px'>{item.mealPrice}</span></p>     
      </div>
      <div className='d-flex align-items-center'>
        <button className='rstBtn inc' onClick={(e)=>{increaseItems(index);e.preventDefault()}}><i className="bi bi-plus"></i></button>
        <button className='rstBtn dec' onClick={(e)=>{e.preventDefault();decrement(index)}}><i className="bi bi-dash"></i></button>
        <button className='rstBtn remove' onClick={()=>{deleteItem(index)}}><i className="bi bi-x"></i></button>
      </div>
     
      </div>
     
      
      
      
      )
        })}
       <h3 className='mt-35 size-18 weight-700 fst-italic'>Total Price {currencySign }{ totalPrice}</h3>
       </>

        </Modal>
        
        }
      </>
     
    )
}

export default FoodCart
