import { useNavigate } from "react-router-dom";
import { getBadgeColor } from "../constants";
import { formatPrice } from "../utils/format";
import StarRating from "./StarRating";
import useViewedStore from "../store/useViewedStore";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const { addViewedProduct } = useViewedStore();

  const handleClickAndAddViewed = (productId) => {
    navigate(`/products/${productId}`);
    addViewedProduct(productId);
  };
  return (
    <>
      {products?.data?.map((product) => (
        <div
          key={product._id}
          className="card bg-base-100 shadow-sm relative select-none cursor-pointer overflow-hidden"
          onClick={() => handleClickAndAddViewed(product._id)}
        >
          <figure>
            <img
              className="w-full h-52 object-fit-cover"
              src={product.image}
              alt={product.name}
            />
          </figure>

          <div className="card-body p-4">
            <div className="spcae-y-2 w-full h-full flex flex-col justify-between">
              <h2 className="text-md xl:text-xl font-bold">{product.name}</h2>

              <div>
                <p className="text-sm/tight text-base-content/60">
                  {product.shortDescription}
                </p>
                <div className="flex flex-1 items-center justify-start">
                  <span className="mr-1.5 text-lg font-bold text-orange-600">
                    {product.rating}
                  </span>
                  <StarRating rating={product.rating} />
                  <span className="ml-1.5 text-md text-base-content/60">
                    ({product?.ratingCount || 123})
                  </span>
                </div>

                <div className="py-2 flex items-center justify-between">
                  <p className="text-md/tight xl:text-xl/tight font-bold text-base-content/80">
                    {formatPrice(product.price)}
                  </p>
                  <div
                    className={`badge badge-outline w-fit ${getBadgeColor(
                      product.category.name
                    )}`}
                  >
                    {product.category.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
