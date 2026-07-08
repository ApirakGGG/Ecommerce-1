"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack, MdDeleteOutline, MdShoppingCartCheckout } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbRosetteDiscount } from "react-icons/tb";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/untils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  const subtotal = cartTotalAmount;
  const taxRate = 0.07;
  const shippingRate = 0.01;
  const promotionRate = 0.10;

  const taxAmount = subtotal * taxRate;
  const shippingAmount = subtotal * shippingRate;
  const promotionDiscountAmount = subtotal * promotionRate;
  const totalAmount = subtotal + taxAmount + shippingAmount - promotionDiscountAmount;

  // ── EMPTY STATE ──────────────────────────────────────────────────
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200">
            <HiOutlineShoppingBag className="text-gray-300" size={64} />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
            <span className="text-white text-xs font-bold">0</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 text-sm mb-8 text-center max-w-xs">
          Looks like you haven&apos;t added anything yet. Start browsing our collection!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <MdArrowBack size={18} />
          Start Shopping
        </Link>
      </div>
    );
  }

  // ── MAIN CART ────────────────────────────────────────────────────
  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-400 text-sm mt-1">
            {cartProducts.length} {cartProducts.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <button
          onClick={handleClearCart}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 border border-red-200 hover:border-red-400 hover:bg-red-50 px-4 py-2 rounded-xl transition-all duration-200"
        >
          <MdDeleteOutline size={18} />
          Clear Cart
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* ── LEFT: Item list ── */}
        <div className="flex-1 min-w-0">
          {/* Column headers */}
          <div className="hidden md:grid grid-cols-12 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 px-4">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="flex flex-col gap-3">
            {cartProducts.map((item, index) => (
              <ItemContent key={index} item={item} />
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mt-6 transition-colors group"
          >
            <MdArrowBack
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            Continue Shopping
          </Link>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="w-full lg:w-[360px] lg:sticky lg:top-24 flex-shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/60 overflow-hidden">
            {/* Card header */}
            <div className="bg-gray-900 px-6 py-5">
              <h2 className="text-white font-bold text-lg">Order Summary</h2>
            </div>

            {/* Price breakdown */}
            <div className="px-6 py-5 flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <TbRosetteDiscount size={16} className="text-green-500" />
                  Promotion (10%)
                </span>
                <span className="font-semibold text-green-600">−{formatPrice(promotionDiscountAmount)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping (1%)</span>
                <span className="font-semibold text-gray-900">+{formatPrice(shippingAmount)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>VAT (7%)</span>
                <span className="font-semibold text-gray-900">+{formatPrice(taxAmount)}</span>
              </div>

              <div className="border-t border-gray-100 my-1" />

              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 text-base">Total</span>
                <span className="font-bold text-2xl text-gray-900">{formatPrice(totalAmount)}</span>
              </div>

              <p className="text-xs text-gray-400 -mt-1">
                Taxes and shipping calculated at checkout
              </p>
            </div>

            {/* Checkout button */}
            <div className="px-6 pb-6">
              <button
                onClick={() =>
                  currentUser ? router.push("/checkout") : router.push("/login")
                }
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-semibold text-sm hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <MdShoppingCartCheckout size={20} />
                {currentUser ? "Proceed to Checkout" : "Login to Checkout"}
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                <span>🔒 Secure Payment</span>
                <span>•</span>
                <span>🚚 Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
