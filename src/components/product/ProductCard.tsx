import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/format";
import { routes } from "../../utils/routes";
import FadeImage from "../ui/FadeImage";
import Rating from "../ui/Rating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={routes.product(product.id)}
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
