import { useParams } from "react-router-dom";
import CourseFeatures from "../../components/CourseFeatures";
import StarRating from "../../components/StarRating";
import useProductStore from "../../store/useProductStore";
import { useEffect } from "react";
import { formatPrice } from "../../utils/format";
import { Loader } from "lucide-react";
import { getBadgeColor } from "../../constants";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { productDetail, isGetingProducts, getProductById } = useProductStore();

  useEffect(() => {
    getProductById(id);
  }, [id, getProductById]);

  if (isGetingProducts) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-8 p-8 py-16 items-start bg-base-100 min-h-[calc(80vh-3rem)]">
      {/* Product Image */}
      <div className="flex justify-center items-center rounded-lg overflow-hidden">
        <img
          src={productDetail?.image}
          alt="Product Image"
          className="w-full h-[70vh] object-fit-cover"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-4 text-primary max-w-xl w-full select-none">
        <h1 className="text-5xl font-semibold font-montserrat">
          {productDetail?.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <StarRating rating={productDetail?.rating} />
          <span className="text-base-content">
            {productDetail?.rating} (based on 453 reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-base-content/60 w-lg">
          {productDetail?.description}
        </p>

        {/* Price */}
        <div className="space-y-3">
          <p className="text-3xl tracking-wide font-bold">
            {formatPrice(productDetail?.price)}
          </p>
          <p
            className={`badge badge-outline text-md font-semibold ${getBadgeColor(
              productDetail?.category.name
            )}`}
          >
            {productDetail?.category.name}
          </p>
        </div>

        {/* Button */}
        <button className="btn btn-primary w-lg rounded-full">Shop Now</button>

        <CourseFeatures />
      </div>
    </div>
  );
};

export default ProductDetailPage;
