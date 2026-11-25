import NotFoundState from "../components/ui/NotFoundState";
import { routes } from "../utils/routes";

export default function NotFoundPage() {
  return (
    <NotFoundState
      title="Page not found"
      message="The page you're looking for doesn't exist or may have moved."
      actionTo={routes.home}
      actionLabel="Back to home"
    />
  );
}