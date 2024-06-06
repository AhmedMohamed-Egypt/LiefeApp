import { useEffect, useState } from "react";

function FetchData(link) {
 // const [currency,setCurrency] = useState([])
  const [meals, setMeals] = useState([]);
  
  const [error, setError] = useState("");
  const [isLoading,setIsloading] = useState(false)
  useEffect(() => {
    async function getData() {
      try {
        setIsloading(true)
        const res = await fetch(`${link}`,{
          method:"GET",
          headers:{
            "X-MASTER-KEY":"$2a$10$eb5fMMQQKy3XfIbmNVHyme7iRC0x6iF6vv7XxuLVMJKiEQaMJ4qBi",

          }
        });
        const data = await res.json();
        if (res.ok) {
          setMeals(data.record.meals);
        //  setCurrency(data)
        } else {
          throw new Error("Error Conection");
        }
      } catch (error) {
        setError(error.message);
      }
      setIsloading(false)
    }
    getData();
  }, []);

  return { meals , error,isLoading };
}
export { FetchData };