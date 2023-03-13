import PrefsContext from "../context/PrefsContext";
import { useContext } from "react";

function CartComponent() {
  const userPrefs = useContext(PrefsContext);

  function removeFromCart(productNr) {
    const updatedProducts = userPrefs.cart.products
      .map((item) => {
        // map through products in cart
        if (item.produktnummer === productNr) {
          return { ...item, quantity: item.quantity - 1 }; // return a copy of the products with the quantity of removed item -1
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // filter a new array with all objects that has quantity greater then 0
    const updateTotal = updatedProducts.reduce(
      // recalculates the whole cart
      (total, product) => total + product.pris * product.quantity,
      0
    );
    userPrefs.dispatch({
      type: "UPDATE_CART",
      payload: { products: updatedProducts, total: updateTotal },
    });
  }

  return (
    <>
      {userPrefs.cart.products.map((obj, index) => (
        <div key={index}>
          <div className="flex justify-between h-24">
            <img src={obj.img} width="100"></img>
            <div className="flex flex-col ml-3">
              <h2>{obj.namn}</h2>
              <small>{obj.produktnummer}</small>
              <small>Qty {obj.quantity}</small>
            </div>
            <button
              onClick={() => removeFromCart(obj.produktnummer)}
              className="h-6 mt-auto bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
            >
              remove
            </button>
          </div>
          <hr className="mt-2" />
        </div>
      ))}
      {userPrefs.cart.products.length > 0 && (
        <p>Total {userPrefs.cart.total} kr</p>
      )}
    </>
  );
}
export default CartComponent;
