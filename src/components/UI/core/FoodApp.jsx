import { UseFood } from "../../../Context/FoodContext";
import FoodHeader from "./FoodHeader";
import CartItem from "./CartItem";
import OrangeLoading from "../../OrangeLoading";
import Alert from "../../Alert";
import Modal from "../Modal";

function FoodApp() {
  const { meals, error, isLoading,added ,hideModal} = UseFood();
  const items = meals.map((item) => <CartItem key={item.id} item={item} />);
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
      </div>
      {added&& <Modal onClick={handleAdded} title={'Attention'}>This is Item Already to the Cart, if you want to remove to add more , you can go to your Cart </Modal>}
    </div>
  );
}

export default FoodApp;
