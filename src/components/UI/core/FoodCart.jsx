
import { useEffect, useState } from 'react'
import { UseFood } from '../../../Context/FoodContext'
import Button from '../Button'
import Modal from '../Modal'

function FoodCart() {
  const {filterdMeals,currencySign,shaking,increaseItems,decrement,deleteItem,valueMeal} = UseFood()
  const [show,setShow] = useState(false)
  
  
  const noOfItems = filterdMeals.map((item)=>item.noOfItems).reduce((acc,cur)=>acc+cur,0)

  const totalPrice = filterdMeals.map((item)=>{return {num:+item.noOfItems,price:(+item.price*valueMeal)}}).reduce((acc,cur)=>acc+(cur.num*cur.price),0).toFixed(2)

  const totalEachMeal = filterdMeals.reduce((acc,cur)=>{
    if(!acc.map((item)=>item.name).includes(cur.name)){
      return [...acc,{totalPrice : cur.noOfItems * (cur.price * valueMeal)}]
    }else {
      return [...acc]
    }
  },[])

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
      <div className='w-90 border-bottom d-flex align-items-center'>
      <p className='mb-0 mr-10'>{index+1}-</p>
        <p className='mb-0  fst-italic weight-500 w-150' >{item.name}</p>
        <p className='mb-0 ml-15 noOfItems size-15' >{item.noOfItems}</p>
       <p className='ml-12 mb-0  weight-bold size-12'><span className='d-inline-block width20Px text-end mr-10 '>{currencySign}</span> <span className='text-ceter d-inline-block width50Px'>{(item.price * valueMeal).toFixed(2)}</span>
       <span>{totalEachMeal[index].totalPrice.toFixed(2)}</span>
       </p>     
      </div>
      <div className='d-flex align-items-center'>
        <button className='rstBtn inc' onClick={(e)=>{increaseItems(index);e.preventDefault()}}><i className="bi bi-plus"></i></button>
        <button className='rstBtn dec' onClick={(e)=>{e.preventDefault();decrement(index)}}><i className="bi bi-dash"></i></button>
        <button className='rstBtn remove' onClick={()=>{deleteItem(index)}}><i className="bi bi-x"></i></button>
      </div>
     
      </div>
     
      
      
      
      )
        })}
       <h3 className='mt-35 size-18 weight-700 fst-italic'>Total Price {currencySign }<span className='d-inline-block pl-15'>{ totalPrice}</span></h3>
       </>

        </Modal>
        
        }
      </>
     
    )
}

export default FoodCart
