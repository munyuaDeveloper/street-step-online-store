import CategoryImg from "../assest/products/airpodes/boAt Airdopes 111 4.webp";
const ProductCategories = () => {
  return (
    <div className="container mx-auto px-4 flex justify-center gap-6 my-5">
      {[1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12].map((i) => (
        <div
          key={i}
          className="bg-slate-200 w-[100px] h-[100px] rounded-full flex items-center justify-center cursor-pointer"
        >
          <img src={CategoryImg} className="object-contain w-[80px] h-[80px] rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
