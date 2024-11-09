import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/ProductCard/ProductCard";
import useProduct from "../../Hooks/useProduct";


const LaptopProduct = () => {
    const { products, refetch, isLoading } = useProduct();
    if (isLoading) return <Loader />;
    return (
        <div className="px-2 lg:px-8 pb-10">
            <div>
        <h3 className="text-2xl mb-5 font-bold">Featured Products</h3>
      </div>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.slice(0, 10).map((product, idx) => (
          <>
            {((product?.category === "laptop" || product?.category === "category" || product?.discountPercentage > 1) && product?.quantity > 0) && (
              <div key={idx} className="snap-start flex-shrink-0 w-full sm:w-auto">
                <ProductCard product={product} refetch={refetch} />
              </div>
            )}
          </>
        ))}
      </div>
        </div>
    );
};

export default LaptopProduct;