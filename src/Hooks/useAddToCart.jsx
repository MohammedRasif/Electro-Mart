import toast from "react-hot-toast";
import UserAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useCart from "./useCart";

const useAddToCart = () => {
    const { user } = UserAuth();
    const axiosPublic = useAxiosPublic();
    const { carts, refetch } = useCart();
    const handleAddCart = (product, quantity = 1) => {
        const cartItem = carts.find(cart => cart?.mainProductId === product?._id && cart?.adderMail === user?.email);
        if (product?.quantity <= 0) {
            toast.error("Stock Out");
            return;
        }
        if (cartItem) {
            toast.error("Already added to cart");
            return;
        }
        const subtotal = (product?.price * quantity).toFixed(2);
        const cartProductInfo = {
            mainProductId: product._id,
            selectedQuantity: quantity,
            subtotal,
            adderMail: user?.email,
        };
        axiosPublic.post("/carts", cartProductInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Added to cart");
                    refetch(); // Refetch the cart to update with new item
                }
            })
            .catch(err => {
                console.error(`Error adding to cart: ${err}`);
                toast.error("Failed to add to cart");
            });
    };

    return handleAddCart;
};
export default useAddToCart;