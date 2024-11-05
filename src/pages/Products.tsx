import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import AddProductModal from "../components/AddProductModal";
import moment from "moment";
import { Product } from "../interfaces/interface";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      fetch("/api/get-products")
        .then((res) => res.json())
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchProducts();
  }, []);

  const handleCloseAddProductModal = () => {
    setOpenAddProductModal(false);
  };

  return (
    <div className="w-full bg-white p-4 shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl mb-2 text-fuchsia-500">All Products</h2>
        <button
          className="bg-fuchsia-700 text-white py-2 px-4 rounded-md"
          onClick={() => setOpenAddProductModal(true)}
        >
          New Product
        </button>
      </div>
      <table className="min-w-full">
        <thead className="bg-fuchsia-700 text-white">
          <tr className="text-left p-2">
            <th className="p-2">#</th>
            <th className="p-2">Product Image</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Brand Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Selling Price</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {products.map((product, index) => (
            <tr
              key={product._id}
              className="border-b hover:bg-fuchsia-50 cursor-pointer"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2 max-w-[60px]" >
                <img src={product?.productImage[0]} alt="product image" className="h-[50px] w-[50px] object-contain rounded-sm" />
              </td>
              <td className="p-2 max-w-56 text-ellipsis line-clamp-3">{product.productName}</td>
              <td className="p-2">{product?.brandName}</td>
              <td className="p-2 capitalize">{product?.category}</td>
              <td className="p-2 capitalize">{product?.price}</td>
              <td className="p-2 capitalize">{product?.sellingPrice}</td>
              <td className="p-2">{moment(product?.createdAt).format("LLL")}</td>
              <td className="p-2">
                <BsPencilSquare className="text-fuchsia-700 text-3xl" onClick={() => setOpenAddProductModal(true)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <p className="text-center text-fuchsia-500 my-10">
          Fetching products. Please wait...
        </p>
      )}

      {openAddProductModal && (
        <AddProductModal onClose={handleCloseAddProductModal} />
      )}
    </div>
  );
};

export default Products;
