import { useEffect } from "react";
import { Star, StarHalf } from "lucide-react";
import Banner from "../../components/Banner";
import useProductStore from "../../store/useProductStore";

const HomePage = () => {
  const { products, getProductPagination } = useProductStore();
  console.log("👉 ~ HomePage ~ products:", products);

  useEffect(() => {
    getProductPagination(1, 6);
  }, [getProductPagination]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <StarHalf
            key={i}
            className="w-5 h-5 text-orange-400 fill-orange-400"
          />
        );
      }
    }
    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="bg-base-100/80 w-full">
      <Banner />
      <div className="py-16">
        {/* Title */}
        <div className="text-center ">
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
              className="card bg-base-100 shadow-sm relative"
            >
              <div className="badge badge-accent absolute bottom-5 right-2.5">
                Best Seller
              </div>
              <figure>
                <img
                  className="w-full"
                  src={
                    "https://img-c.udemycdn.com/course/240x135/3873464_403c_3.jpg"
                  }
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
                      <div className="flex">{renderStars(product.rating)}</div>
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
      </div>
    </div>
  );
};

export default HomePage;
