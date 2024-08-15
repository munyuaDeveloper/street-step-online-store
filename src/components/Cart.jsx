import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addItem, reduceQuantity, removeItem } from "../store/CartSlice";
import currencyFormatter from "../helpers/currencyFormatter";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Cart = () => {
  const { cart, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItemFromCart = (product) => {
    dispatch(removeItem(product));
  };

  const addItemToCart = (product) => {
    dispatch(addItem(product))
  }

  const reduceItemQuantity =(product) => {
    dispatch(reduceQuantity(product))
  }

  return (
    <div className="w-full h-96 min-w-[400px] md:max-h-[600px] md:h-full md:w-[500px] p-4 bg-white shadow-xl overflow-y-auto rounded-sm ">
      <div className="products">
        <p className="text-xl font-semibold border-b mb-3">Cart Items</p>
        {cart?.map((product, index) => (
          <div
            key={product?._id}
            className="flex justify-between mb-4 text-base"
          >
            <p className="max-w-6">{index + 1}</p>
            <div className="hidden md:block h-[50px] w-[50px]">
              <img
                src={product?.productImage[0]}
                alt="product image"
                className="h-full w-full object-scale-down rounded-sm"
              />
            </div>
            <p className="max-w-32 min-w-32 line-clamp-2 text-left">
              {product?.productName}
            </p>
            <div className="flex items-center mb-4 gap-2 min-w-16">
                <FaMinusCircle className="text-lg cursor-pointer" onClick={() => reduceItemQuantity(product)}/>
                <p>{product?.quantity}</p>
                <FaPlusCircle className="text-lg cursor-pointer" onClick={()=> addItemToCart(product)}/>
                 
            </div>
           
            <p className="capitalize max-w-32">
              {currencyFormatter(product?.sellingPrice * product?.quantity)}
            </p>
            <IoClose
              onClick={() => removeItemFromCart(product)}
              className="cursor-pointer"
            />
          </div>
        ))}

        {!cart?.length ? (
          <p className="text-sm text-center"> No product yet!</p>
        ) : (
          <div className="flex justify-between items-center">
            <p />
            <p className="text-xl font-bold text-fuchsia-800">Total Amount: </p>
            <p className="text-fuchsia-800 text-lg font-semibold border-b-4 border-fuchsia-700 underline  pb-1">{currencyFormatter(totalAmount)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
