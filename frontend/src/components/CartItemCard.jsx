import { Trash2 } from "lucide-react";
import { formatPrice } from "../utils/format";

const CartItemCard = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="card bg-base-100 shadow-md p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-xl">{item.product.name}</h3>
          <p className="text-gray-500">{formatPrice(item.product.price)}</p>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-xs"
              onClick={() =>
                onUpdateQuantity(item.product._id, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-xs"
              onClick={() =>
                onUpdateQuantity(item.product._id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-md font-bold">
          <span className="text-lg">Total: </span>
          {formatPrice(item.product.price * item.quantity)}
        </p>
        <button
          className="btn btn-ghost text-error"
          onClick={() => onRemove(item.product._id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
