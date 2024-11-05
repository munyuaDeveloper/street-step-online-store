import { useEffect, useRef, useState } from "react";
import fetchCategoryProducts from "../helpers/fetchCategoryProducts";
import currencyFormatter from "../helpers/currencyFormatter";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { addItem } from "../store/CartSlice";
import { useDispatch } from "react-redux";
import React from "react";
import { Product } from "../interfaces/interface";

const VerticalCardProducts = ({ category, title }: {category: string, title: string}) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch =  useDispatch()

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

  const addCartItem =(e: React.MouseEvent<HTMLButtonElement>, item: Product)=> {
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
                <div key={index} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                </div>
                <div className='p-4 grid gap-3'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                    <div className='flex gap-3'>
                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                    </div>
                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                </div>
            </div>
            );
          })}

        {!loading &&
          data.map((product) => (
            <Link to={'/product/' + product?._id}
              key={product?._id}
              className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow cursor-pointer"
            >
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={product?.productImage[0]}
                  className="mix-blend-multiply object-scale-down h-full hover:scale-110 transition-all"
                />
              </div>
              <div className="p-4 grid gap-2">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-3 text-sm">
                  <p className="text-fuchsia-600 font-medium">
                    {currencyFormatter(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {currencyFormatter(product?.price)}
                  </p>
                </div>
                <button onClick={(e)=>addCartItem(e,product)} className="text-sm bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-3 py-2 rounded-full">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default VerticalCardProducts;
