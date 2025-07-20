import { useEffect } from "react";
import useCartStore from "../../store/useCartStore";
import Breadcrumbs from "../../components/Breadcrumbs";
import { formatPrice } from "../../utils/format";
import CartItemRow from "../../components/CartItemRow";
import CartItemCard from "../../components/CartItemCard";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const breadcrumbs = [
  { name: "Home", link: "/" },
  { name: "Cart", link: "/cart" },
];

const CartPage = () => {
  const { cart, getCart, updateItemFromCart, removeItemFromCart } =
    useCartStore();

  const { isCheckingAuth, authUser, isGettingCart } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      getCart();
    } else {
      navigate("/auth/login", { replace: true });
    }
  }, [getCart, isCheckingAuth, authUser, navigate]);

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity >= 1) updateItemFromCart({ productId, quantity });
  };

  const handleRemove = (productId) => {
    removeItemFromCart(productId);
  };

  if (isCheckingAuth || isGettingCart) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-xl">
        Loading your cart...
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  return (
    <div className="min-h-screen p-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-3xl font-bold text-primary">Cart</h1>

      {cart?.length === 0 ? (
        <div className="text-center text-2xl text-gray-500 flex justify-center items-center h-40">
          Your cart is empty.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto mt-4">
            <table className="table w-full bg-base-100 shadow-md rounded-lg">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Course</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, idx) => (
                  <CartItemRow
                    key={idx}
                    item={item}
                    index={idx}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-4">
            {cart?.map((item, idx) => (
              <CartItemCard
                key={idx}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="mt-6 flex justify-end">
            <div className="text-right">
              <p className="text-xl font-semibold mb-2">
                Total: {formatPrice(totalPrice)}
              </p>
              <button
                disabled={cart?.length === 0}
                className="btn btn-primary w-full sm:w-auto"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
