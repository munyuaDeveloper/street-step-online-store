import { useEffect, useState } from "react";

const ProductCategories = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyCategories = new Array(13).fill(null)

  useEffect(() => {
    const fetchCategories = async () => {
      await fetch("/api/get-category-product")
        .then((res) => res.json())
        .then((res) => {
          setLoading(false)
          setProductCategories(res.data);
        })
        .catch(() => {
          setLoading(false)
        })
    };

    fetchCategories();
  }, []);
  return (
    <div className="container mx-auto px-4 flex items-center justify-between gap-3 md:gap-6 my-5 w-full overflow-x-auto scrollbar-none">
      {
        loading && dummyCategories.map((product, index) => (
          <div key={index}>
            <div
              className="bg-slate-200 w-16 h-16 md:w-20 md:h-20 p-4 rounded-full flex items-center justify-center overflow-hidden animate-pulse"
            >
            </div>
          </div>
        ))
      }
      
      {!loading && productCategories.map((product) => (
        <div key={product._id}>
          <div
            className="bg-slate-200 w-16 h-16 md:w-20 md:h-20 p-4 overflow-hidden rounded-full flex items-center justify-center cursor-pointer"
          >
            <img
              src={product?.productImage[0]}
              className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
            />
          </div>
          <p className="text-center capitalize">{product?.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
