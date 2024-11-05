import { useCallback, useEffect, useState } from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import currencyFormatter from "../helpers/currencyFormatter";
import CategoryProducts from "../components/CategoryProducts";
import { addItem } from "../store/CartSlice";
import { useDispatch } from "react-redux";
import React from "react";
import { Product } from "../interfaces/interface";

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState("");
  const productId = useParams().id;
  const dispatch = useDispatch()
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const loadingProductList = new Array(4).fill(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/product-details", {
        headers: {
          "content-type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          productId,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setActiveImg(res.data.productImage[0]);
        })
        .catch(() => setLoading(false));
    };

    fetchData();
  }, [productId]);

  const handleZoomImage = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      setZoomImage(true);

      const target = e.target as HTMLElement;
      const { left, top, width, height } = target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const addCartItem = (item: Product) => {
    dispatch(addItem(item))
  }

  return (
    <>
      <div className="container p-4 mx-auto w-full">
        {!loading && (
          <div className="flex flex-col md:flex-row gap-8 mb-10 md:mb-20">
            <div>
              <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-9">
                <div className="flex md:flex-col gap-2">
                  {!loading &&
                    data!.productImage.map((url) => {
                      return (
                        <div
                          key={url}
                          onClick={() => setActiveImg(url)}
                          className="h-20 w-20 bg-slate-200 cursor-pointer"
                        >
                          <img
                            onMouseEnter={() => setActiveImg(url)}
                            src={url}
                            className="w-full h-full object-scale-down mix-blend-multiply"
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="bg-slate-200 w-full p-4 h-[350px] md:w-[300px] lg:h-[450px] lg:w-[450px] relative">
                  <img
                    src={activeImg}
                    onMouseMove={handleZoomImage}
                    onMouseLeave={handleLeaveImageZoom}
                    className="w-full h-full object-scale-down mix-blend-multiply cursor-zoom-in"
                  />

                  {zoomImage && (
                    <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                      <div
                        className="w-full h-full min-h-[450px] min-w-[500px] mix-blend-multiply scale-150"
                        style={{
                          background: `url(${activeImg})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `${zoomImageCoordinate.x * 100
                            }% ${zoomImageCoordinate.y * 100}% `,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="grid gap-4">
                <p className="bg-fuchsia-300 text-fuchsia-700 rounded-full px-2 text-center w-fit">
                  {data?.brandName}
                </p>
                <p className="text-3xl font-semibold">{data?.productName}</p>
                <p className="capitalize text-slate-500">{data?.category}</p>
                <div className="text-red-400 flex">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfStroke />
                </div>
                <div className="flex gap-2 text-lg font-semibold">
                  <p className="text-red-700">
                    {currencyFormatter(data?.sellingPrice)}
                  </p>
                  <p className="text-slate-400 line-through">
                    {currencyFormatter(data?.price)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="bg-fuchsia-500 text-white hover:bg-fuchsia-700 rounded-lg px-2 py-1">
                    Buy Now
                  </button>
                  <button
                    onClick={() => addCartItem(data!)}
                    className="bg-fuchsia-500 text-white hover:bg-fuchsia-700 rounded-lg px-2 py-1">
                    Add To Cart
                  </button>
                </div>
                <div>
                  <p className="font-semibold">Description: </p>
                  <p>{data?.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div>
              <div className="flex flex-col-reverse md:flex-row gap-4">
                <div className="flex md:flex-col gap-2">
                  {loadingProductList.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="h-20 w-20 bg-slate-200 cursor-pointer animate-pulse"
                      ></div>
                    );
                  })}
                </div>
                <div className="bg-slate-200 h-96 w-96 animate-pulse"></div>
              </div>
            </div>
            <div>
              <div className="grid gap-1 w-full">
                <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block"></p>
                <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full"></h2>
                <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>

                <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>

                <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
                  <p className="text-red-600 bg-slate-200 w-full"></p>
                  <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
                </div>

                <div className="flex items-center gap-3 my-2 w-full">
                  <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
                  <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
                </div>

                <div className="w-full">
                  <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full"></p>
                  <p className=" bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full"></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {data?.category && !loading && (
        <CategoryProducts
          category={data?.category}
          title={"Recommended Product"}
        />
      )}
    </>
  );
};

export default ProductDetails;
