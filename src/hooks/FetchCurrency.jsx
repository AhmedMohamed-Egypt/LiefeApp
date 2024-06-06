import { useEffect, useState } from "react";

function FetchCurrency(link) {
  const [currency, setCurrency] = useState([]);
  useEffect(()=>{
    async function fetchingApi() {
        const res = await fetch(link);
        const data = await res.json();
        setCurrency(data);
    
      }
      fetchingApi()
  },[])



  return {currency}
}

export{FetchCurrency}
