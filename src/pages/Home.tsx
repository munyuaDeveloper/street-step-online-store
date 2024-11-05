import React from "react"
import HorizontalCardProducts from "../components/HorizontalCardProducts"
import ProductBanner from "../components/ProductBanner"
import ProductCategories from "../components/ProductCategories"
import VerticalCardProducts from "../components/VerticalCardProducts"

const Home = () => {
  return (
    <div className="mt-4">
      <ProductCategories />
     <ProductBanner />
     <HorizontalCardProducts category={"airpodes"} title={"Top's Airpodes"}/>
     <HorizontalCardProducts category={"watches"} title={"Popular's Watches"}/>

     <VerticalCardProducts category={"mobiles"} title={"Mobiles"}/>
      <VerticalCardProducts category={"Mouse"} title={"Mouse"}/>
      <VerticalCardProducts category={"televisions"} title={"Televisions"}/>
      <VerticalCardProducts category={"camera"} title={"Camera & Photography"}/>
      <VerticalCardProducts category={"earphones"} title={"Wired Earphones"}/>
      <VerticalCardProducts category={"speakers"} title={"Bluetooth Speakers"}/>
      <VerticalCardProducts category={"refrigerator"} title={"Refrigerator"}/>
      <VerticalCardProducts category={"trimmers"} title={"Trimmers"}/>
    </div>
  )
}

export default Home
