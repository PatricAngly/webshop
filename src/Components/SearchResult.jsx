import PrefsContext from "../context/PrefsContext";
import { useContext } from "react";
import CartComponent from "./cart";

function SearchResultComponent() {
  const userPrefs = useContext(PrefsContext);

  function handleAddToCart(product) {
    const itemIndex = userPrefs.cart.products.findIndex(
      (item) => item.produktnummer === product.produktnummer
    );

    if (itemIndex === -1) {
      // Produkten finns inte i varukorgen än, så lägger till ett nytt objekt med quantity 1
      userPrefs.dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity: 1 },
      });
    } else {
      // Produkten finns redan i varukorgen, så ökar quantity med 1 för det befintliga objektet
      const updatedProducts = [...userPrefs.cart.products];
      updatedProducts[itemIndex] = {
        ...updatedProducts[itemIndex],
        quantity: updatedProducts[itemIndex].quantity + 1,
      };
      userPrefs.dispatch({
        type: "UPDATE_CART",
        payload: { products: updatedProducts },
      });
    }
  }

  return (
    <>
      <div className="flex justify-evenly">
        <div>
          {userPrefs.result.map((obj, i) => (
            <div key={i} className="gap-2 mt-6 pt-6">
              <div className="flex justify-between items-center h-32">
                <div className="flex">
                  <img src={obj.img} width="100"></img>
                  <div className="flex flex-col ml-3 justify-between">
                    <h2>{obj.namn}</h2>
                    <small>{obj.produktnummer}</small>
                  </div>
                </div>
                <div className="flex flex-col ml-3">
                  <button
                    onClick={() => handleAddToCart(obj)}
                    className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600 text-center"
                  >
                    Add to cart
                  </button>
                  <p>{obj.pris}</p>
                </div>
              </div>
              <hr className="mt-2" />
            </div>
          ))}
        </div>
        <div>
          <CartComponent />
        </div>
      </div>
    </>
  );
}
export default SearchResultComponent;
