import React, { useEffect } from "react";
import useProductStore from "../../store/useProductStore";
import useAuthStore from "../../store/useAuthStore";
import { Loader2, RefreshCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ExplorePage = () => {
  const { isGetingProducts, suggestions, getSuggestions } = useProductStore();
  const { isCheckingAuth, authUser } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      getSuggestions();
    } else {
      navigate("auth/login", { replace: true });
    }
  }, []);

  const handleRefresh = () => getSuggestions();
  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Explore Products</h1>
        <button
          className="btn btn-sm btn-outline gap-2"
          onClick={handleRefresh}
          disabled={isGetingProducts}
        >
          <RefreshCcw className="size-4" />
          Refresh
        </button>
      </div>

      {isGetingProducts ? (
        <div className="flex justify-center mt-20">
          <Loader2 className="animate-spin size-8 text-primary" />
        </div>
      ) : suggestions.length === 0 ? (
        <div className="text-center text-zinc-500 mt-20">
          No suggestions found. Interact with products to get personalized
          suggestions.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {suggestions.map((product) => (
            <div
              key={product._id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <figure>
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title line-clamp-1">{product.name}</h2>
                <p className="text-sm text-zinc-500 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-primary font-medium">
                    ${product.price}
                  </span>
                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
