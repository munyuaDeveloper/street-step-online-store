import { useEffect, useRef, useState } from "react";
import fetchCategoryProducts from "../helpers/fetchCategoryProducts";
import currencyFormatter from "../helpers/currencyFormatter";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/CartSlice";
import React from "react";
import { Product } from "../interfaces/interface";

const HorizontalCardProducts = ({ category, title }: {category: string, title: string}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchCategoryProducts(category);
      setData(res?.data);
      setLoading(false);
    };

    fetchData();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current!.scrollLeft += 370;
  };
  const scrollLeft = () => {
    scrollElement.current!.scrollLeft -= 370;
  };

  const addCartItem =(e: React.MouseEvent, item: Product)=> {
    e?.stopPropagation()
    e?.preventDefault()
    dispatch(addItem(item))
  }

  return (
    <div className="container px-4 my-4 mx-auto relative">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading &&
          loadingList.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                  <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-3 w-full">
                    <p className="font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                  </div>
                  <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            );
          })}

        {!loading &&
          data.map((product: Product) => (
            <Link to={'/product/' + product?._id}
              key={product?._id}
              className="w-full min-w-[370px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-sm shadow flex cursor-pointer"
            >
              <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                <img
                  src={product?.productImage[0]}
                  className="mix-blend-multiply object-scale-down h-full hover:scale-110 transition-all"
                />
              </div>
              <div className="p-4 grid">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex flex-col gap-2 text-sm">
                <p className="text-slate-500 line-through">
                    {currencyFormatter(product?.price)}
                  </p>
                  <p className="text-fuchsia-600 font-medium">
                    {currencyFormatter(product?.sellingPrice)}
                  </p>
                </div>
                <button
                onClick={(e) => addCartItem(e, product)}
                 className="text-sm bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-3 py-0.5 rounded-full mt-4">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default HorizontalCardProducts;
