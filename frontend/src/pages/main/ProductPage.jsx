import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import ProductCard from "../../components/ProductCard";
import useProductStore from "../../store/useProductStore";
import Pagination from "../../components/Pagination";

const ProductPage = () => {
  const { products, isGetingProducts, getProductPagination } =
    useProductStore();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProductPagination(currentPage);
  }, [getProductPagination, products]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  console.log("👉 ~ ProductPage ~ products:", products);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 space-y-1.5 p-4 lg:gap-2">
      {/* Filter */}
      <aside className="collapse lg:collapse-open md:col-span-1 shadow-sm rounded-r-none border-base-content/30 lg:border-r lg:p-2 sticky top-0 self-start h-screen">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold font-monospace flex items-center justify-between px-0 py-2">
          <div className="flex items-center">
            <Filter size={20} className="mr-2" /> Filter
          </div>
          <div>
            <ChevronDown className="lg:hidden" size={20} />
          </div>
        </div>
        <div className="collapse-content text-sm space-y-4 overflow-hidden px-0">
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-lg">Search</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-2">
                <Search size={20} className="text-base-content/40" />
              </div>
              <input
                type="search"
                className="input input-md pl-10 focus:outline-none rounded-lg w-full"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-lg">Category</span>
            </label>
            <div>
              <select
                defaultValue={"Select a category"}
                className="select select-md rounded-lg w-full focus:outline-none"
              >
                <option disabled={true}>Select a category</option>
                {Array.from({ length: 5 }, (_, index) => (
                  <option key={index}>Category {index + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn btn-primary w-full">Filter</button>
        </div>
      </aside>

      <section className="md:col-span-3 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard products={products} />
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={products?.pagination?.totalPages}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default ProductPage;
