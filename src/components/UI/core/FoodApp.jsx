import { UseFood } from "../../../Context/FoodContext";
import FoodHeader from "./FoodHeader";
import CartItem from "./CartItem";
import OrangeLoading from "../../OrangeLoading";
import Alert from "../../Alert";
import Modal from "../Modal";

function FoodApp() {
  const {  error, isLoading,added ,hideModal,searchedMealsFilter} = UseFood();
  const mealItems = searchedMealsFilter
  const items = mealItems.map((item,index) => <CartItem key={item.id} index={index} item={item} />);
  const showItems = !isLoading && !error;
  const handleAdded = ()=>{
    hideModal()
   
  }

  return (
    <div className={`foodLayout pt-50`}>
      <div className="container ">
        <FoodHeader />
        {isLoading && <OrangeLoading orangeColor={"orangeBk"} />}
        {error && (
          <Alert
            message="Please Check Connection"
            className={"cntrElmnt alert-danger foodLayout__alert"}
          />
        )}
        {showItems && (
          <div className=" animate__fadeIn animate__animated foodLayout__container">
            <div className="row">{items}</div>

            
          </div>
        )}
        {showItems&&(items.length<=0)&& <Alert
            message="No Items Matched"
            className={"cntrElmnt alert-danger  no-animate"}
          />}
      </div>
      {added&& <Modal onClick={handleAdded} title={'Attention'}>
        <p className="weight-500"> This is Item Already Added to the Cart, if you want to remove or  add more , you can go to your Cart </p></Modal>}
    </div>
  );
}

export default FoodApp;
