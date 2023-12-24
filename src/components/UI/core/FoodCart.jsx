import { UseFood } from '../../../Context/FoodContext'
import Button from '../Button'

function FoodCart() {
  const {filterdMeals} = UseFood()
  const noOfItems = filterdMeals.map((item)=>item.noOfItems).reduce((acc,cur)=>acc+cur,0)

    return (
      <Button className={'cartFoodBtn text-white boradius-28'}>
        Cart {noOfItems}
        <i className="bi bi-cart d-inline-block ml-5"></i>
      
      </Button>
    )
}

export default FoodCart
