import { Trash2 } from "lucide-react";
import { formatPrice } from "../utils/format";

const CartItemRow = ({ item, index, onUpdateQuantity, onRemove }) => {
  return (
    <tr key={item.product._id}>
      <td>{index + 1}</td>
      <td className="flex items-center gap-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <span>{item.product.name}</span>
      </td>
      <td>{formatPrice(item.product.price)}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-xs"
            disabled={item.quantity <= 1}
            onClick={() =>
              onUpdateQuantity(item.product._id, item.quantity - 1)
            }
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
      </td>
      <td>{formatPrice(item.product.price * item.quantity)}</td>
      <td>
        <button
          className="btn btn-ghost text-error"
          onClick={() => onRemove(item.product._id)}
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
