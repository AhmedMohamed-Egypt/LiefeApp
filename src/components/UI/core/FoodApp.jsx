import { UseFood } from "../../../Context/FoodContext";
import FoodHeader from "./FoodHeader";
import CartItem from "./CartItem";
import OrangeLoading from "../../OrangeLoading";
import Alert from "../../Alert";

function FoodApp() {
  const { meals, error, isLoading } = UseFood();
  const items = meals.map((item) => <CartItem key={item.id} item={item} />);
  const showItems = !isLoading && !error;

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
    </div>
  );
}

export default FoodApp;
