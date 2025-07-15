import { useEffect } from "react";
import Banner from "../../components/Banner";
import useProductStore from "../../store/useProductStore";
import { useNavigate } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";
import ProductCard from "../../components/ProductCard";

const HomePage = () => {
  const { products, getProducts } = useProductStore();
  const navigate = useNavigate();
  useEffect(() => {
    getProducts(1, 8);
  }, [getProducts]);

  return (
    <div className="bg-base-100/80 w-full">
      <Banner />
      <div className="py-16">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl tracking-tight text-primary uppercase font-anton">
            Our course
          </h1>
          <p className="py-4 w-3/4 md:w-1/2 mx-auto text-xs md:text-sm lg:text-base text-base-content/80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem ratione ipsam autem dolor unde esse eius ad ipsa
            adipisci nobis?
          </p>
        </div>
        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 space-y-2 p-4">
          <ProductCard products={products} />
        </div>

        <div className="flex justify-center items-center p-4">
          <button
            className="btn btn-wide px-4 py-2 rounded-full text-lg font-monospace flex items-center animate-bounce-x"
            onClick={() => navigate("/products")}
          >
            View more <ArrowBigRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
