import { useState } from "react";
import { UseFood } from "../../../Context/FoodContext";

function Currency() {
  const { currency, getCurrency } = UseFood();
  const currencyReg = Object.keys(currency.data).map((key) => {
    return { cur: key, val: currency.data[key] };
  });

  const defaultValue = currencyReg.reduce((acc, cur, index) => {
    if (cur.cur === "USD") {
      return [...acc, { index: index }];
    } else {
      return [...acc];
    }
  }, []);

  const [val, setVal] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setVal(+e.target.value);
    getCurrency(+e.target.value);
  };

  const txtSelect =
    val === "" || val === defaultValue[0].index ? 'Change to your Currency' : "Reset the Currency"

  return (
    <div className="currencyChange position-absolute d-flex  align-items-end">
      <button className="rstBtn" onClick={() => setShow((show) => !show)}>
        <i className={`bi bi-gear size-25 ${show && "orange"}`}></i>
      </button>

      {show && (
        <select
          className="form-select pe-pointer"
          aria-label="Default select example"
          value={val}
          onChange={(e) => handleChange(e)}
        >
          <option value={defaultValue[0].index}>{txtSelect}</option>
          {currencyReg.map((item, index) => (
            <option value={index} key={index}>
              {item.cur}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default Currency;
