import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/format";
import { useToast } from "../../hooks/useToast";
import { Button } from "../ui/Button";
import FadeImage from "../ui/FadeImage";
import Rating from "../ui/Rating";
import Toast from "../ui/Toast";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { message, show } = useToast();

  // Stub: the cart is built in another task.
  function handleAddToCart() {
    console.log("Add to cart (stub)", { id: product.id, title: product.title });
    show("Added to cart (demo)");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="aspect-square overflow-hidden bg-surface">
        <FadeImage
          src={product.image}
          alt={product.title}
          loading="eager"
          className="h-full w-full object-contain p-10 mix-blend-multiply sm:p-16"
        />
      </div>

      <div className="flex flex-col gap-4 lg:py-4">
        <p className="text-neutral-500 capitalize">{product.category}</p>
        <h1 className="text-3xl leading-tight font-medium sm:text-4xl">{product.title}</h1>
        <p className="text-2xl font-medium">{formatPrice(product.price)}</p>
        <Rating rating={product.rating} countStyle="full" size="md" />

        <p className="mt-2 leading-7 text-neutral-700">{product.description}</p>

        <Button size="lg" className="mt-6 w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>

      <Toast message={message} />
    </div>
  );
}
