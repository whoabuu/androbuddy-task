import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import FadeImage from "./FadeImage";
import Rating from "./Rating";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(value: number): string {
  return usd.format(value);
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      <div className="aspect-square overflow-hidden bg-surface">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <FadeImage
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-8 mix-blend-multiply"
          />
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 min-h-12 leading-6 font-medium">{product.title}</h3>
        <p className="text-neutral-500 capitalize">{product.category}</p>
        <Rating rating={product.rating} />
        <p className="pt-1 font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}