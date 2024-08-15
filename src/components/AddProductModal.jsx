import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import UploadProductImage from "./UploadProductImage";
import { useRef, useState } from "react";
import productCategories from "../helpers/productCategories";

const AddProductModal = ({ onClose }) => {
  const [productImages, setProductImages] = useState([]);
  const formRef = useRef();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    data["productImage"] = productImages;

    await createProduct(data);
  };

  const createProduct = async (payload) => {
    await fetch("/api/upload-product", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(res.message);
        // onClose();
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const reset = () => {
    setProductImages([]);
    formRef.current.reset();
  };

  return (
    <div className="fixed bg-slate-700 min-h-full min-w-full top-0 bottom-0 left-0 z-20 flex items-center bg-opacity-80">
      <div className="bg-white mx-auto shadow-lg w-96 md:w-[40%] p-4 rounded">
        <button className="block ml-auto" onClick={() => onClose(null)}>
          <AiOutlineClose className="" />
        </button>
        <h1 className="text-xl mt-0 pt-0 border-b font-semibold uppercase">
          Add Product
        </h1>

        <form
          className="mt-6 grid gap-3"
          onSubmit={handleFormSubmit}
          ref={formRef}
        >
          <div className="w-full grid gap-1">
            <label>Product Name</label>
            <input
              className="outline-none border p-2 rounded bg-fuchsia-50"
              type="text"
              name="productName"
              placeholder="Enter Product name"
              required
            />
          </div>
          <div className="w-full grid gap-1">
            <label>Brand Name</label>
            <input
              className="outline-none border p-2 rounded bg-fuchsia-50"
              type="text"
              name="brandName"
              placeholder="Enter brand name"
              required
            />
          </div>
          <div className="w-full grid gap-1">
            <label>Category</label>
            <select
              className="outline-none border p-2 rounded bg-fuchsia-50"
              type="text"
              name="category"
              placeholder="Enter category"
              required
            >
              <option>Select Category</option>
              {productCategories.map((cat) => (
                <option key={cat.id} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full grid gap-1">
            <label>Price</label>
            <input
              className="outline-none border p-2 rounded bg-fuchsia-50"
              type="number"
              name="price"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="w-full grid gap-1">
            <label>Selling Price</label>
            <input
              className="outline-none border p-2 rounded bg-fuchsia-50"
              type="number"
              name="sellingPrice"
              placeholder="Enter selling price"
              required
            />
          </div>
          <div className="w-full grid gap-1">
            <label>Description</label>
            <textarea
              className="outline-none border p-2 rounded bg-fuchsia-50"
              type="number"
              name="description"
              placeholder="Enter product details"
              required
            />
          </div>

          <UploadProductImage
            setProductImgUrls={(images) => setProductImages(images)}
          />

          <button
            type="submit"
            className="bg-fuchsia-700 w-full text-white py-2 mt-6 mb-2 rounded"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
