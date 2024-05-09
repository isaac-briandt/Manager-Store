import { useNavigate } from "react-router-dom";
import { UseAppSelector, useAppDispatch } from "../hooks";
import {
  AiFillMinusSquare,
  AiFillDelete,
  AiFillPlusSquare,
} from "react-icons/ai";
import { increase, decrease, clearCart, removeFromCart } from "../../../features/shopSlice";
import { toast } from "react-toastify";

export default function Cart() {
  const { cartItems, quantity, total } = UseAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (quantity === 0 && total === 0) {
      toast.warn("Your Cart is Empty!");
    } else {
      toast.success("Your Purchase was Successful!");
    }
    setTimeout(() => {
      navigate("/");
      dispatch(clearCart());
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className=" text-2xl font-medium mt-8 mb-14">
        <span>Your Cart</span>
      </div>
      {cartItems.map((items) => {
        return (
          <div className="flex flex-col gap-4" key={items.id}>
            <img
              className="rounded"
              src={items.imgUrl}
              alt="Manga Photo"
              width={180}
              height={250}
            />
            <div className="flex flex-col justify-center items-center">
              <div className=" text-gray-500">{items.title}</div>
              <div className="font-medium">{items.price} $</div>
              <div className="font-medium py-2">{items.quantity}</div>
              <div className="flex items-center gap-1 mb-8">
                <button>
                  <AiFillMinusSquare onClick={() => {
                    if(quantity === 1){
                      dispatch(removeFromCart(items.id))
                    } else{
                      dispatch(decrease(items.id))
                    }
                  }} className="size-7 text-red-500" />
                </button>
                <div onClick={() => dispatch(removeFromCart(items.id))} className="flex gap-2 justify-center items-center text-white bg-red-500 rounded-md w-24 cursor-pointer">
                  <button>
                    <AiFillDelete />
                  </button>
                  <span>Remove</span>
                </div>
                <button onClick={() => dispatch(increase(items.id))}>
                  <AiFillPlusSquare className="size-7 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex flex-col justify-center items-center gap-5">
        <span className=" font-medium text-3xl">Cart Summary</span>
        <span className=" font-bold text-red-500 text-5xl">
          Total ( {quantity} ): {total} $
        </span>
        <button
          type="button"
          onClick={handlePurchase}
          className="py-0.5 px-3 bg-red-500 text-white rounded-md"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
