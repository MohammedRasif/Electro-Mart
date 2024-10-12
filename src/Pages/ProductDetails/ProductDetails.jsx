import { useLoaderData, useParams } from "react-router-dom";
import MainProductDetails from "./Shared/topLayer/MainProductDetails";
import TopLayerOfDetails from "./Shared/topLayer/TopLayerOfDetails";
import { Helmet } from "react-helmet";
import RelativeProducts from "../../components/ProductCard/RelativeProducts";


const ProductDetails = () => {
    const products = useLoaderData();
    const { id } = useParams();
    const product = products.find((pack) => pack._id == id);
    console.log(product);

    return (
        <div className="space-y-9">
            <Helmet>
                <title>Details | Elector Mart</title>
            </Helmet>
            {/* top layer of details */}
            <div className="mt-20">
                <TopLayerOfDetails title={product.title} id={product?._id} />
            </div>
            {/* main details section */}

            <MainProductDetails product={productDetails}  />
            <ProductReview />

            <MainProductDetails product={product} />
            <RelativeProducts category={product?.category} productId={product?._id} />

            <br /><br /><br /><br /><br />
            {/* <RelativeProducts /> */}
        </div>
    );
};
export default ProductDetails;