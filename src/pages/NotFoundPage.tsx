import { Link } from "react-router-dom";
import { Container } from "../components/Layout";

interface NotFoundPageProps {
  title?: string;
  message?: string;
  actionTo?: string;
  actionLabel?: string;
}

export default function NotFoundPage({
  title = "Page not found",
  message = "The page you're looking for doesn't exist or may have moved.",
  actionTo = "/",
  actionLabel = "Back to home",
}: NotFoundPageProps) {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight uppercase">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-neutral-500">{message}</p>
      <Link
        to={actionTo}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-700"
      >
        {actionLabel}
      </Link>
    </Container>
  );
}