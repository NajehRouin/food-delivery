import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState();
    const router=useRouter()

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData= JSON.parse(localStorage.getItem('restaurantUser'));
        const resto_id= restaurantData._id;
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id);
        response = await response.json();
        if (response.success) {
            setFoodItems(response.result)
        } else {
            alert("food item list not loading")
        }

    }

    const deleteFoodItem=async(id)=>{
        let response = await fetch('http://localhost:3000/api/restaurant/foods/'+id,{
            method:'delete'
        });
        response = await response.json();
        if(response.success){
            loadFoodItems();
        }else{
            alert("food item not deleted")
        }
    }


    return (
<div className="container mx-auto px-4">
  <h1 className="text-2xl font-bold mb-4 text-center">Food Items</h1>
  <div className="flex justify-center"> {/* Ajout de flexbox ici */}
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-center">Index</th>
          <th className="py-3 px-6 text-center">Name</th>
          <th className="py-3 px-6 text-center">Price</th>
          <th className="py-3 px-6 text-center">Description</th>
          <th className="py-3 px-6 text-center">Image</th>
          <th className="py-3 px-6 text-center">Operations</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {foodItems &&
          foodItems.map((item, key) => (
            <tr
              key={key}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {key + 1}
              </td>
              <td className="py-3 px-6 text-center">{item.name}</td>
              <td className="py-3 px-6 text-center">{item.price} DT</td>
              <td className="py-3 px-6 text-center">{item.description}</td>
              <td className="py-3 px-6 text-center">
                <img
                  src={item.img_path}
                  alt={item.name}
                  className="h-16 w-16 object-cover mx-auto"
                />
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => deleteFoodItem(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => router.push('dashboard/' + item._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</div>


      
    )
    
}

export default FoodItemList;