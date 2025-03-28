import { GoGitCompare } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { LuFacebook } from "react-icons/lu";
import { FaLinkedinIn, FaStar, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { BsTelegram } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import {
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";
import useAddToCart from "../../../../Hooks/useAddToCart";
import AddCart from "../../../../components/AddToCart/AddCart";
import useAddToCompare from "../../../../Hooks/useAddToCompare";
import useAddToWishlist from "../../../../Hooks/useAddToWishlist";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useProduct from "../../../../Hooks/useProduct";
import ReactHtmlParser from "react-html-parser";
import useReview from "../../../../Hooks/useReview";
import useCart from "../../../../Hooks/useCart";
import { Link } from "react-router-dom";
import useRoll from "../../../../Hooks/useRoll";

const OtherProductDetails = ({ product }) => {
  const { theUserCarts } = useCart();
  const theCart = theUserCarts.find(
    (cart) => cart?.mainProductId === product?._id
  );
  const { reviews } = useReview();
  const allReview = reviews.filter((review) => review?.mainId === product?._id);
  const axiosPublic = useAxiosPublic();
  const { refetch } = useProduct();
  const [role] = useRoll();
  const handleAddCart = useAddToCart();
  const handleAddCompare = useAddToCompare();
  const handleAddWishlist = useAddToWishlist();
  const [quantityCount, setQuantityCount] = useState(
    theCart?.selectedQuantity || 0
  );
  const [disableBtn, setDisableBtn] = useState(false);
  const shareUrl = window.location.href;
  const [cartOpen, setCartOpen] = useState(false);
  // // console.log(theCart);

  // Calculate average rating
  const calculateAverageRating = (products) => {
    const totalRating = products.reduce(
      (sum, product) => sum + product.rating,
      0
    );
    const averageRating = totalRating / products.length;
    return averageRating.toFixed(2); // Round to 2 decimal places
  };
  const averageRating = calculateAverageRating(allReview);
  // // console.log(averageRating);

  const increaseCount = () => {
    if (quantityCount === parseInt(product?.quantity)) {
      toast.error("Stocks Out");
      setDisableBtn(true);
      return;
    } else {
      const increasedCount = quantityCount + 1;
      setQuantityCount(increasedCount);
    }
  };
  const decreaseCount = () => {
    if (quantityCount > 0) {
      const decreasedCount = quantityCount - 1;
      setQuantityCount(decreasedCount);
      setDisableBtn(false);
    }
  };
  const handleQuantity = async () => {
    const updatedQuantity =
      parseInt(product?.quantity) - parseInt(quantityCount);
    const updatedQuantityInfo = { updatedQuantity };
    const response = await axiosPublic.patch(
      `/productQuantity/${product?._id}`,
      updatedQuantityInfo
    );
    if (response.data.modifiedCount) {
      refetch();
    }
  };

  const handleAddToCart = () => {
    handleAddCart(product, quantityCount);
    handleQuantity();
    setCartOpen(true);
  };
  const handleAddToCompare = () => {
    handleAddCompare(product);
  };
  const handleAddToWishlist = () => {
    handleAddWishlist(product);
  };

  return (
    <div>
      <div className="lg:space-y-3 ">
        {/* Title & Rating start */}
        <div>
          <h3 className="text-[15px] md:text-2xl lg:text-[23px] font-semibold lg:font-semibold ">
            {product?.title}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 py-1">
              <div className="font_cabin text-[10px] flex gap-3 lg:gap-8 text-sm  lg:text-lg text-[#767676]">
                {!isNaN(averageRating) && averageRating ? (
                  <p className="flex gap-1 items-center">
                    <FaStar className="text-[#ffd700]" /> {averageRating}
                  </p>
                ) : (
                  <p className="flex gap-2 items-center">
                    <FaStar className="text-[#ffd700]" /> (0)
                  </p> // Or you can render nothing by using null
                )}
                ( customer Review)
              </div>
            </div>
            <div className=" rounded-full  text-sm bg-gray-50 lg:text-lg text-blue-500   px-4">
              {product?.quantity <= 0 ? (
                <p>Stock Out</p>
              ) : (
                <p>({product?.quantity}) In Stock </p>
              )}
            </div>
          </div>
        </div>
        {/* Title & Rating end */}

        {/* Price & description start */}
        <div>
          <div className="text-xl gap-2 mb-2 lg:text-4xl text-blue-500 font-semibold flex items-center font_cabin">
            {product?.discountPrice == product?.price ? (
              <div className="flex gap-2 ">
                <p className="text-blue-500 font-semibold text-sm md-text-xl lg:text-3xl space-x-0">
                  {" "}
                  ৳ {product?.price}
                </p>
              </div>
            ) : product?.discountPrice > 1 ? (
              <div className="flex gap-x-1 items-baseline">
                <p className="text-blue-500 font-semibold text-sm md-text-xl lg:text-3xl space-x-0">
                  ৳ {parseInt(product?.discountPrice)}
                </p>
                <span className="line-through text-red-500  font-semibold text-xs md:text-lg">
                  {" "}
                  ৳{product?.price}
                </span>
              </div>
            ) : (
              <div className="flex gap-2">
                <p className="font-bold text-blue-500"> ৳ {product?.price}</p>
              </div>
            )}
          </div>
          <div className="font_cabin text-sm lg:text-base text-gray-700">
            <p>{ReactHtmlParser(product?.shortDescription)}</p>
          </div>
          {/* Price & description end */}
          {role === "member" && (
            <div className="divider my-2 md:my-0 lg:my-auto"></div>
          )}
          {/* Quantity & cart start */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-2 mt-3">
            <div className="py-2   px-2 inline-block bg-white border border-gray-200 rounded-lg w-1/2 md:w-1/4">
              <div className="flex  items-center justify-between gap-x-3.5">
                <button
                  type="button"
                  onClick={() => decreaseCount()}
                  disabled={theCart}
                  className="size-6 inline-flex justify-center items-center pb-1 text-lg gap-x-2  font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  tabIndex="-1"
                  aria-label="Decrease"
                  data-hs-input-number-decrement=""
                >
                  &minus;
                </button>
                <span>{quantityCount}</span>
                <button
                  type="button"
                  onClick={() => increaseCount()}
                  disabled={disableBtn || theCart}
                  className="size-6 inline-flex justify-center items-center pb-1 bg-white gap-x-2 text-lg font-medium rounded-md border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-x-3  md:space-x-3">
              <button
                onClick={handleAddToCart}
                className="px-9 md:px-14 py-2  text-sm lg:text-base bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 duration-300 focus:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                Add to cart
              </button>

              <Link to={"/checkout-page"}>
                <button
                  onClick={handleAddToCart}
                  className="px-9 md:px-14 py-2 text-sm lg:text-base   font-semibold rounded-md text-blue-500 border border-blue-500 hover:text-white duration-300 hover:bg-blue-500 focus:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  Buy now
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Quantity & cart end */}
        <div className="divider  my-2 md:my-0 lg:my-auto"></div>
        {/* Share & compare start */}
        <div className="lg:my-5 flex flex-col  xl:flex-row justify-between gap-y-1 ">
          <div className="flex text-sm md:text-base pb-2 lg:text-lg">
            <button
              onClick={handleAddToCompare}
              className="flex items-center hover:text-[#666666] space-x-1"
            >
              <div>
                <GoGitCompare className="text-blue-500" />
              </div>
              <h3 className="font-medium  font_cabin">Compare</h3>
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex items-center hover:text-[#666666] pl-8 space-x-1"
            >
              <div>
                <GoHeart className="text-blue-500" />
              </div>
              <h3 className="font-medium  font_cabin">Add to wishlist</h3>
            </button>
          </div>

          <div className="flex items-center">
            <h3 className="font-medium font_cabin text-sm md:text-base lg:text-lg">
              Share:
            </h3>
            <div className="flex items-center space-x-2 ml-1 lg:text-xl text-blue-500 gap-4">
              <FacebookShareButton url={shareUrl}>
                <LuFacebook className="cursor-pointer text-3xl bg-blue-100 rounded-full p-2  hover:bg-blue-500 hover:text-white duration-700" />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl}>
                <FaXTwitter className="cursor-pointer text-3xl bg-blue-100 rounded-full p-2  hover:bg-blue-500 hover:text-white duration-700" />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl}>
                <FaLinkedinIn className="cursor-pointer text-3xl bg-blue-100 rounded-full p-2  hover:bg-blue-500 hover:text-white duration-700" />
              </LinkedinShareButton>
              <TelegramShareButton url={shareUrl}>
                <BsTelegram className="cursor-pointer text-3xl bg-blue-100 rounded-full p-2  hover:bg-blue-500 hover:text-white duration-700" />
              </TelegramShareButton>
              <WhatsappShareButton url={shareUrl}>
                <FaWhatsapp className="cursor-pointer text-3xl bg-blue-100 rounded-full p-2  hover:bg-blue-500 hover:text-white duration-700" />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
        {/* Share & compare end */}
      </div>
      <div className="divider my-2 md:my-0 lg:my-auto"></div>
      <div className="flex items-center justify-center gap-x-1 mb-5 mx-2 px-2 xl:px-4 py-2  bg-blue-50 rounded-lg text-sm md:text-base">
        <FaRegEye className="mt-1 " />
        <p>{product?.view || 0} People Watching this product now!</p>
      </div>
      {cartOpen && <AddCart setCartOpen={setCartOpen} />}
    </div>
  );
};
OtherProductDetails.propTypes = {
  product: PropTypes.object,
};
export default OtherProductDetails;
