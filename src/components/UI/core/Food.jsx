//import OrangeLoading from "../../OrangeLoading"
import img from '../../../../public/imgs/photo-1.png'
import Button from '../Button'
function Food() {
    return (
        <div className="food">
          <div className="food__hero d-flex align-items-center justify-content-between mx-auto">
            <div>
            <h1>
            The Best Restaurants In Your Home
            </h1>
            <Button className={'orderNow text-white mt-50'}>Order Now </Button>
            </div>
           
            <div>
                <img src={img} alt="" />
            </div>
          </div>
          
        </div>
    )
}

export default Food
