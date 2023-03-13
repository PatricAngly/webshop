import PrefsContext from "../context/PrefsContext";
import { useContext } from "react";
import CartComponent from "./cart";
import ModalComponent from "./modal";

function SearchResultComponent() {
  const userPrefs = useContext(PrefsContext);

  function handleAddToCart(product) {
    const itemIndex = userPrefs.cart.products.findIndex(
      // retrun the index of the product
      (item) => item.produktnummer === product.produktnummer
    );
    if (itemIndex === -1) {
      // if the product doesn't exist in cart, add new object with quantity 1
      userPrefs.dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity: 1 },
      });
    } else {
      //  else increase existing ones with quantity by 1
      const updatedProducts = [...userPrefs.cart.products];
      updatedProducts[itemIndex] = {
        ...updatedProducts[itemIndex],
        quantity: updatedProducts[itemIndex].quantity + 1,
      };
      const updateTotal = updatedProducts.reduce(
        // recalculates the whole cart
        (total, product) => total + product.pris * product.quantity,
        0
      );

      userPrefs.dispatch({
        type: "UPDATE_CART",
        payload: {
          products: updatedProducts,
          total: updateTotal,
        },
      });
    }
  }

  return (
    <>
      {userPrefs.result.length < 1 && (
        <p className="text-center">No result found</p>
      )}
      <div className="flex justify-evenly">
        <div>
          {userPrefs.result.map((obj, i) => (
            <div key={i} className="gap-2 mt-6 pt-6">
              <div className="flex justify-between items-center h-32">
                <div className="flex">
                  <img src={obj.img} width="100"></img>
                  <div className="flex flex-col ml-3">
                    <h2>{obj.namn}</h2>
                    <small>{obj.produktnummer}</small>
                    <div className="mt-6">
                      <ModalComponent modal={obj} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-3">
                  <button
                    onClick={() => handleAddToCart(obj)}
                    className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600 text-center"
                  >
                    Add to cart
                  </button>
                  <p>{obj.pris} kr</p>
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
