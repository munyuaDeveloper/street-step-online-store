export interface CreateProductBody {
  productName: string;
  brandName: string;
  category: string;
  price: number;
  sellingPrice: number;
  description: string;
  productImage: string[] | File;
}
export interface AddProductModalProps {
  onClose: () => void;
}

export interface Product {
  _id: string;
  productName: string;
  brandName: string;
  category: string;
  price: number;
  sellingPrice: number;
  description: string;
  createdAt: string;
  productImage: string[];
  quantity?: number
}
export interface UserRootStateInterface{
  user: User
}
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profilePic: string
  __v: number;
}

export interface ChangeRoleModalProps {
  user: User;
  onClose: (role: string | null) => void;
}

export interface UploadProductImageProps {
  setProductImgUrls: (updatedImgs: string[]) => void;
}
export interface CartInterface {
  _id: string;
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: number;
  sellingPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  quantity: number;
}

export interface CartRootInterface {
  totalAmount: number;
  count: number;
  cart: CartInterface[]
}

export interface State {
  user: UserRootStateInterface;
  cart: CartRootInterface;
}

export interface ChartDataInterface {
  id: number;
  month: string;
  sales: number;
}