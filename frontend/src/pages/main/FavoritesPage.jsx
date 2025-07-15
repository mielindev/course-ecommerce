import { useEffect } from "react";
import useFavoriteStore from "../../store/useFavoriteStore";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Favorites",
    link: "/favorites",
  },
];

const FavoritesPage = () => {
  const { favorites, removeFavorite, getFavorites } = useFavoriteStore();

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const onRemove = async (productId) => {
    await removeFavorite(productId);
    getFavorites();
  };

  return (
    <div className="p-4 bg-base-200 min-h-screen">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-3xl font-bold font-monospace mb-6">
        Favorite Courses
      </h1>

      {favorites?.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No favorite courses yet. Start adding some!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites?.map((data, idx) => (
            <div key={idx} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={data?.product?.image}
                  alt={data?.product?.title}
                  className="object-fit-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title line-clamp-2">
                  {data?.product?.name}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {data?.product?.description}
                </p>
                <div className="card-actions justify-between mt-4">
                  <Link
                    to={`/products/${data?.product?._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onRemove(data?.product?._id)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <Heart className="w-5 h-5 fill-error text-error" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
