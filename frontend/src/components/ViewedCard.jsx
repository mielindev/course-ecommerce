import { Link } from "react-router-dom";

const ViewedCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <figure>
        <img
          src={product?.image || "/placeholder.jpg"}
          alt={product?.name}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2">{product?.name}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product?.description}
        </p>
        <Link
          to={`/products/${product?._id}`}
          className="btn btn-primary btn-sm mt-3"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ViewedCard;
