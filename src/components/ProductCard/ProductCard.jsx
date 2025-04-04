import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { FaCartShopping, FaHeart, FaStar } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import HoverImage from "react-hover-image/build";
import AddCart from "../AddToCart/AddCart";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAddToCart from "../../Hooks/useAddToCart";
import useAddToCompare from "../../Hooks/useAddToCompare";
import useAddToWishlist from "../../Hooks/useAddToWishlist";
import useReview from "../../Hooks/useReview";
import useRoll from "../../Hooks/useRoll";

const ProductCard = ({ product, refetch, shop,newHome }) => {
  const [role] = useRoll();
  // console.log(role);
  const { reviews } = useReview();
  const allReview = reviews.filter((review) => review?.mainId === product?._id);
  const [title, setTitle] = useState("");
  useEffect(() => {
    // Adjust title based on screen size
    const updateTitle = () => {
      const titleLength = window.innerWidth >= 1024 ? 40 : 20;
      setTitle(product?.title.slice(0, titleLength));
    };

    updateTitle();
    window.addEventListener("resize", updateTitle);
    return () => window.removeEventListener("resize", updateTitle);
  }, [product]);

  // Calculate average rating
  const calculateAverageRating = (products) => {
    const totalRating = products.reduce(
      (sum, product) => sum + product.rating,
      0
    );
    const averageRating = totalRating / products.length;
    return averageRating.toFixed(2); // Round to 2 decimal places
  };
  useEffect(() => {
    if (shop) {
      setTitle(product?.title.slice(0, 25));
    }
    if (newHome) {
      setTitle(product?.title.slice(0, 30));
    }
  }, [newHome,shop, product.title]);

  // Usage
  const averageRating = calculateAverageRating(allReview);
  // // console.log(averageRating);

  const handleAddCart = useAddToCart();
  const handleAddCompare = useAddToCompare();
  const handleAddWishlist = useAddToWishlist();
  const axiosPublic = useAxiosPublic();
  const [isHovered, setIsHovered] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const handleViewCount = (_id) => {
    let currentView = product?.view || 0;
    const updateView = currentView + 1;
    const viewInfo = { view: updateView };
    axiosPublic
      .patch(`/productView/${_id}`, viewInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
        }
      })
      .catch(() => {
        // console.log(Error = ${err});
      });
  };

  // // console.log(product.quantity);
  const handleAddToCart = async () => {
    const updatedQuantity = parseInt(product?.quantity) - 1;
    const updatedQuantityInfo = { updatedQuantity };
    const response = await axiosPublic.patch(
      `/productQuantity/${product?._id}`,
      updatedQuantityInfo
    );
    if (response.data.modifiedCount) {
      refetch();
    }
    handleAddCart(product);
    setCartOpen(true);
  };
  const handleAddToCompare = () => {
    handleAddCompare(product);
  };
  const handleAddToWishlist = () => {
    handleAddWishlist(product);
  };

  return (
    <div className="bg-[#F6F6F6] h-full">
      <div className="relative  hover:shadow-lg rounded-md bg-white  px-2 py-2 group h-full">
        <Link to={`/productDetails/${product._id}`}>
          {product.images.length > 1 && (
            <HoverImage
              src={product.images[0]}
              hoverSrc={product.images[1]}
              alt="Product Image"
              onClick={() => handleViewCount(product._id)}
              className="lg:w-full h-[100px] w-[130px] lg:h-[200px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-95"
            />
          )}

          {product.images.length <= 1 && (
            <img
              src={product.images[0]}
              alt="Product Image"
              onClick={() => handleViewCount(product._id)}
              className="lg:w-full h-[100px] w-[130px] lg:h-[200px]  object-cover transition-transform duration-500 ease-in-out group-hover:scale-95"
            />
          )}
        </Link>

        <div className="absolute top-1/3 z-30 right-4 transform -translate-y-1/2 translate-x-full group-hover:translate-x-0 group-hover:opacity-100 opacity-0 group-hover:pointer-events-auto pointer-events-none transition-all duration-500 ease-in-out bg-white p-2 rounded-md border shadow-lg flex flex-col space-y-4">
        
            <>
              <button onClick={handleAddToWishlist}>
                <FaHeart className="text-lg text-blue-600" />
              </button>
              <button onClick={handleAddToCompare}>
                <IoGitCompareOutline className="text-lg text-blue-600" />
              </button>
            </>
         
          <Link
            to={`/productDetails/${product._id}`}
            onClick={() => handleViewCount(product._id)}
          >
            <FaEye className="text-lg text-blue-600" />
          </Link>
        </div>

        {product?.discountPercentage > 1 && (
          <div className="mt-3 capitalize   text-end absolute -top-3 inset-x-0  px-2">
            <small className="bg-blue-500 px-2 py-[1px] text-sm rounded-full font-bold text-white">
              -{product?.discountPercentage}%
            </small>
          </div>
        )}

        {/* product hot new % badge */}
        <div className="absolute top-[2px] w-full ">
          <div className="grid grid-cols-2 justify-between items-center">
            {/* Left side: "New" and "Hot" */}
            <div className="flex flex-col items-start gap-y-0.5">
              {product?.isNew === "yes" && (
                <small className="bg-green-600 px-2 pb-0 lg:text-sm rounded-full font-bold text-white">
                  New
                </small>
              )}
              {product?.isHot === "yes" && (
                <small className="bg-red-500 px-3 pb-[1px] lg:text-sm rounded-full font-bold text-white">
                  Hot
                </small>
              )}
            </div>

            {/* Right side: "10%" */}
          </div>
        </div>

        <div>
          <Link to={`/productDetails/${product._id}`}>
            <h4
              className={`font-semibold text-[10px] lg:text-base capitalize ${
                shop
                  ? "lg:w-[180px] lg:h-[47px]  xl:h-auto xl:w-[250px]"
                  : "w-auto"
              }`}
            >
              {title}{newHome && "..."}
            </h4>
          </Link>
          <div className="flex items-center justify-between">
            <small className="text-gray-400  lg:text-base capitalize font-semibold">
              {product?.brand}
            </small>

            <span className="flex items-center text-[12px] lg:text-base gap-1 font-medium text-slate-600">
              {isNaN(averageRating) ? (
                ""
              ) : (
                <p className="flex gap-1 items-center">
                  <FaStar className="text-[#ffd700]  " /> {averageRating}
                </p>
              )}
            </span>
          </div>
        </div>

        {product?.discountPrice == product?.price ? (
          <div className="flex gap-2 ">
            <p className="font-bold text-blue-500 text-[12px] lg:text-base">
              {" "}
              ৳ {product?.price}
            </p>
          </div>
        ) : product?.discountPrice > 1 ? (
          <div className="flex gap-2">
            <span className="line-through text-red-500  font-semibold text-[12px] lg:text-base">
              {" "}
              ৳{product?.price}
            </span>
            <p className="font-bold text-blue-500 text-[12px] lg:text-base">
              {" "}
              ৳ {parseInt(product?.discountPrice)}{" "}
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <p className="font-bold text-blue-500"> ৳ {product?.price}</p>
          </div>
        )}

        <button
          className={`py-2 font-semibold text-sm lg:text-base px-4 bg-blue-700 mt-4 text-white rounded flex items-center justify-center relative overflow-hidden ${
            role === "admin" && "cursor-not-allowed"
          }`}
          onClick={handleAddToCart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={role === "admin"}
          style={{ height: "2.5rem", width: "100%" }}
        >
          <span
            className={`absolute transition-all flex gap-3 duration-500 ease-in-out ${
              isHovered
                ? "translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <FaCartShopping className="items-center  mt-1" /> Add To Cart
          </span>
          <BsCart
            size={20}
            className={`absolute transition-all duration-500 ease-in-out ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          />
        </button>

        {cartOpen && <AddCart setCartOpen={setCartOpen} />}
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  product: PropType.object,
  refetch: PropType.func,
  shop: PropType.string,
  newHome: PropType.string,
};

export default ProductCard;
