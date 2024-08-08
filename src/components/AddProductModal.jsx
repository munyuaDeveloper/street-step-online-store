import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

const AddProductModal = ({ onClose }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    data["productImage"] = [
      "https://5.imimg.com/data5/ANDROID/Default/2021/3/GF/TK/WJ/16516658/product-jpeg-500x500.jpg",
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/5/x/2/6-air-full-black-06-06-cool-and-creative-air-full-black-original-imagmqwuvztmhpdk.jpeg?q=90&crop=false",
    ];

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
        onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      });
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

        <form className="mt-6 grid gap-3" onSubmit={handleFormSubmit}>
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
            <input
              className="outline-none border p-2 rounded bg-fuchsia-50"
              type="text"
              name="category"
              placeholder="Enter category"
              required
            />
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
