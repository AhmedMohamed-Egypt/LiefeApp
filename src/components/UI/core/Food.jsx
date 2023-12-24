//import OrangeLoading from "../../OrangeLoading"

import Button from "../Button";
import { useState } from "react";
import FoodApp from "./FoodApp";
import img from "../../../../public/imgs/photo-1.png";
function Food() {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    setShow(false);
  };
  return (
    <>
      {show && (
        <>
          <div className="food">
            <div className="food__hero d-flex align-items-center justify-content-between mx-auto">
              <div>
                <h1>The Best Restaurants In Your Home</h1>
                <Button
                  onClick={handleClick}
                  className={"orderNow text-white mt-50"}
                >
                  Order Now{" "}
                </Button>
              </div>

              <div>
                <img src={img} alt="Home-Delivery-Food" />
              </div>
            </div>
          </div>
        </>
      )}
      {!show && <FoodApp />}
    </>
  );
}

export default Food;
