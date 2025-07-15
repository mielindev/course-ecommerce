import { Link, useParams } from "react-router-dom";
import CourseFeatures from "../../components/CourseFeatures";
import StarRating from "../../components/StarRating";
import useProductStore from "../../store/useProductStore";
import { useEffect, useState } from "react";
import { formatPrice } from "../../utils/format";
import { Heart, Loader } from "lucide-react";
import { getBadgeColor } from "../../constants";
import useFavoriteStore from "../../store/useFavoriteStore";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { productDetail, isGetingProducts, getProductById } = useProductStore();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const [optimisticFavorites, setOptimisticFavorites] = useState([]);

  const isFavorited =
    optimisticFavorites.includes(id) ||
    favorites.some((fav) => fav?.product?._id === id);
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

  const handleFavorite = async (productId) => {
    if (isFavorited) {
      setOptimisticFavorites((prev) => prev.filter((id) => id !== productId));

      try {
        await removeFavorite(productId);
      } catch (error) {
        console.log("Error in removeFavorite: ", error);
        setOptimisticFavorites((prev) => [...prev, productId]);
      }
    } else {
      setOptimisticFavorites((prev) => [...prev, productId]);
      try {
        addFavorite(productId);
      } catch (error) {
        console.log("Error in addFavorite: ", error);
        setOptimisticFavorites((prev) => prev.filter((id) => id !== productId));
      }
    }
  };
  return (
    <div>
      <div className="breadcrumbs text-sm text-base-content/50 mx-5">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
          <li>Product Detail</li>
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full p-4  gap-6 bg-base-100 space-4 min-h-screen">
        {/* Product Image */}
        <div className="flex justify-center items-start rounded-lg overflow-hidden">
          <img
            src={productDetail?.image}
            alt="Product Image"
            className="lg:size-full lg:object-fit-cover rounded-lg"
          />
        </div>
        {/* Product Details */}
        <div className="space-y-4 text-primary select-none">
          <h1 className="text-4xl md:text-5xl font-semibold font-montserrat">
            {productDetail?.name}
          </h1>
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <StarRating rating={productDetail?.rating} />
            <span className="text-base-content">
              {productDetail?.rating} (453 reviews)
            </span>
          </div>
          {/* Description */}
          <p className="text-base-content/60">{productDetail?.description}</p>
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
          <div className="flex items-center space-x-4">
            <button className="btn btn-primary rounded-full w-1/2 flex-1">
              Shop Now
            </button>
            <button
              className="btn btn-primary rounded-full"
              onClick={() => {
                handleFavorite(productDetail._id);
              }}
            >
              <Heart
                size={20}
                fill={isFavorited ? "red" : "none"}
                className={isFavorited ? "text-red-500" : "text-base-content"}
              />
            </button>
          </div>
          <CourseFeatures />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
