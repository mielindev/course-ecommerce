import { useEffect } from "react";
import useViewedStore from "../../store/useViewedStore";
import { Trash2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ViewedCard from "../../components/ViewedCard";
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
    name: "Viewed",
    link: "/viewed",
  },
];

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
      <Breadcrumbs breadcrumbs={breadcrumbs} />
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
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {viewedProducts
            .filter(Boolean)
            .filter((data) => data?.product)
            .map((data, idx) => (
              <ViewedCard key={idx} product={data?.product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ViewedPage;
