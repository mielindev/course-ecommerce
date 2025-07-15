import { useEffect, useState } from "react";
import { ChevronDown, Filter, Loader, Search } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import useProductStore from "../../store/useProductStore";
import Pagination from "../../components/Pagination";
import { useForm } from "react-hook-form";
import useCategoryStore from "../../store/useCategoryStore";
const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priceOption: "",
  });
  const { products, isGetingProducts, getProducts } = useProductStore();
  const { categories, isGettingCategories, getCategories } = useCategoryStore();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    getProducts(
      currentPage,
      9, // or your pageSize
      filters.search,
      filters.category,
      filters.priceOption
    );
  }, [currentPage, filters]); // dependencies!

  if (isGetingProducts || isGettingCategories) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const onSubmit = (data) => {
    setFilters({
      search: data.search || "",
      category: data.category || "",
      priceOption: data.price || "",
    });
    setCurrentPage(1); // reset page to 1
    reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 space-y-1.5 p-4 lg:gap-2">
      {/* Filter */}
      <aside className="collapse lg:collapse-open md:col-span-1 shadow-sm rounded-r-none border-base-content/30 lg:p-2 lg:sticky top-0 self-start h-fit">
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("search")}
                />
              </div>
            </div>

            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text text-lg">Category</span>
              </label>
              <div>
                <select
                  defaultValue={""}
                  className="select select-md rounded-lg w-full focus:outline-none"
                  {...register("category")}
                >
                  <option value="" disabled={true}>
                    Select a category
                  </option>
                  {categories?.data?.map((category) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Price</span>
              </label>
              <select
                defaultValue={""}
                className="select select-md rounded-lg w-full focus:outline-none"
                {...register("price")}
              >
                <option value="" disabled={true}>
                  Select a price
                </option>
                <option value="below500">Less than 500.000đ</option>
                <option value="from500to1000">
                  Form 500.000đ to 1.000.000đ
                </option>
                <option value="over1000">Over 1.000.000đ"</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Filter
            </button>
          </form>
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
