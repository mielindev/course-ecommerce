import { useEffect } from "react";
import Banner from "../../components/Banner";
import useProductStore from "../../store/useProductStore";
import { useNavigate } from "react-router-dom";
import StarRating from "../../components/StarRating";
import { formatPrice } from "../../utils/format";
import { getBadgeColor } from "../../constants";
import { ArrowBigRight, CircleChevronRight, CornerRightUp } from "lucide-react";

const HomePage = () => {
  const { products, getProductPagination } = useProductStore();
  console.log("👉 ~ HomePage ~ products:", products);
  const navigate = useNavigate();
  useEffect(() => {
    getProductPagination(1, 8);
  }, [getProductPagination]);

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
          {products?.data?.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-sm relative select-none cursor-pointer overflow-hidden"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <div
                className={`badge badge-outline absolute bottom-5 right-2.5 ${getBadgeColor(
                  product.category.name
                )}`}
              >
                {product.category.name}
              </div>
              <figure>
                <img
                  className="w-full h-52 object-fit-cover"
                  src={product.image}
                  alt={product.name}
                />
              </figure>

              <div className="card-body">
                <div className="flex content-between min-h-max spcae-y-2">
                  <div className="flex flex-col content-between justify-center">
                    <h2 className="text-md xl:text-xl font-bold">
                      {product.name}
                    </h2>
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
                    <div className="py-2">
                      <p className="text-md/tight xl:text-xl/tight font-bold text-base-content/80">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center p-4">
          <button className="btn btn-wide px-4 py-2 rounded-full text-lg font-monospace flex items-center animate-bounce-x">
            View more <ArrowBigRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
