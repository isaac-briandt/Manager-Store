import { useState } from "react";
import { useMangasQuery } from "../../../features/mangasApi";
import { FaCartPlus, FaArrowDown } from "react-icons/fa";
import { useAppDispatch } from "../hooks";
import { addToCart } from "../../../features/shopSlice";

function Home() {
  const { data } = useMangasQuery();
  const [showSort, setShowSort] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortData, setSortData] = useState("");

  const dispatch = useAppDispatch();

  const mangas =
    sortData === "low"
      ? data && data.slice().sort((a, b) => a.price - b.price)
      : sortData === "high"
      ? data && data.slice().sort((a, b) => b.price - a.price)
      : sortData === "a-z"
      ? data && data?.slice().sort((a, b) => (a.title > b.title ? 1 : -1))
      : sortData === "z-a"
      ? data && data.slice().sort((a, b) => (b.title > a.title ? 1 : -1))
      : sortData === "default"
      ? data
      : data;

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortData(e.target.id);
    setShowSort(false);
  };

  const handleShowSortBy: () => void = () => {
    setShowSort((prev) => !prev);
  };

  return (
    <div className="container-lg pt-32">
      <div className="relative w-full flex mb-5">
        <div className="relative w-full inline-flex justify-between items-center border">
          <div className="w-full">
            <input
              className="w-full outline-blue-500 p-2 focus:shadow border"
              type="text"
              placeholder="Monster..."
              value={searchValue}
              onFocus={() => setIsSearchActive(true)}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="absolute right-2">
            {isSearchActive && (
              <span
                aria-label="closeOnClick"
                onClick={() => setSearchValue("")}
                className="right-0 top-0 p-2 cursor-pointer text-[16px]"
              >
                x
              </span>
            )}
          </div>
        </div>
        <div
          onClick={handleShowSortBy}
          className="bg-red-700 text-white w-24 flex items-center justify-center gap-1 rounded-e-md cursor-pointer"
        >
          Sort By
          <FaArrowDown className="text-[12px]" />
        </div>
        <div className="absolute right-0.5 mt-12 size-52">
          {showSort && (
            <div className="border bg-white rounded text-black">
              <div className="flex flex-col">
                <div className="flex gap-2 hover:bg-gray-400 px-2 pt-2">
                  <input
                    id="default"
                    type="radio"
                    value={sortData}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="default">Default</label>
                </div>

                <hr className="w-full" />
                <div className="flex gap-2 hover:bg-gray-300 px-2">
                  <input
                    id="low"
                    type="radio"
                    value={sortData}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="low">Price(lowest)</label>
                </div>
                <div className="flex gap-2 hover:bg-gray-300 px-2">
                  <input
                    id="high"
                    type="radio"
                    value={sortData}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="high">Price(highest)</label>
                </div>
                <div className="flex gap-2 hover:bg-gray-300 px-2">
                  <input
                    id="a-z"
                    type="radio"
                    value={sortData}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="a-z">A-Z</label>
                </div>
                <div className="flex gap-2 hover:bg-gray-300 px-2">
                  <input
                    id="z-a"
                    type="radio"
                    value={sortData}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="z-a">Z-A</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        {mangas &&
          mangas
            .filter((items) => {
              return searchValue.toLocaleLowerCase() === ""
                ? items
                : items.title.toLocaleLowerCase().includes(searchValue) ||
                    items.price.toLocaleString().includes(searchValue);
            })
            .map((manga) => (
              <div className=" col-md-6 col-lg-4 text-center" key={manga.id}>
                <div className="flex justify-center mb-4">
                  <img
                    className="rounded"
                    src={manga.imgUrl}
                    alt="Manga Photo"
                    width={180}
                    height={250}
                  />
                </div>
                <h1 className="fs-5">{manga.title}</h1>
                <h1 className="lead fw-bold fs-4 my-2">${manga.price}</h1>
                <div
                  onClick={() => dispatch(addToCart(manga))}
                  className="flex justify-center my-4"
                >
                  <span className="flex bg-red-500 rounded px-3 py-2 cursor-pointer">
                    <span className="flex justify-center items-center">
                      <FaCartPlus className="fs-4 text-white me-2" />
                    </span>
                    <button type="button" className="text-white">
                      Add To Cart
                    </button>
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;
