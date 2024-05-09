import { FaCartPlus, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UseAppSelector } from "../app/hooks";

function Navbar() {
  const { quantity } = UseAppSelector((state) => state.shop);

  return (
    <nav className="w-full bg-white border items-center justify-center">
      <div className="flex justify-between py-3 sm:px-44 mx-4">
        <Link style={{ textDecoration: "none" }} to="/">
          <div>
            <h2 className="text-red-800 cursor-pointer">MangaStore</h2>
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/cart">
          <div className=" bg-red-600 px-4 py-2 rounded-3xl flex items-center justify-center text-white cursor-pointer">
            <div>
              <FaCartPlus className="size-5" />
            </div>
            <div className="pl-2">({quantity})</div>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
