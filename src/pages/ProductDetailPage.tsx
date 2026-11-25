import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();
  return <h1 className="text-2xl font-semibold">Product #{id}</h1>;
}