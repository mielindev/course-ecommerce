import { useEffect } from "react";
import useViewedStore from "../../store/useViewedStore";
import { Trash2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ViewedPage = () => {
  const { viewedProducts, getViewedProducts, removeViewedProduct } =
    useViewedStore();
  useEffect(() => {
    getViewedProducts();
  }, [getViewedProducts]);

  const clearViewed = () => {
    removeViewedProduct();
  };
  return (
    <div className="min-h-screen p-4 bg-base-200">
      <div className="breadcrumbs text-sm text-base-content/50">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
          <li className="cursor-pointer">Viewed Products</li>
        </ul>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recently Viewed</h1>
        {viewedProducts.length > 0 && (
          <button onClick={clearViewed} className="btn btn-error btn-sm">
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      {viewedProducts.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No viewed products yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {viewedProducts
            .filter(Boolean)
            .filter((data) => data?.product)
            .map((data, idx) => (
              <div key={idx} className="card bg-base-100 shadow-md">
                <figure>
                  <img
                    src={data?.product?.image || "/placeholder.jpg"}
                    alt={data?.product?.name}
                    className="object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title line-clamp-2">
                    {data?.product?.name}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {data?.product?.description}
                  </p>
                  <Link
                    to={`/products/${data?.product?._id}`}
                    className="btn btn-primary btn-sm mt-3"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ViewedPage;
