import Container from "../layout/Container";
import { ButtonLink } from "./Button";

interface NotFoundStateProps {
  title: string;
  message: string;
  actionTo: string;
  actionLabel: string;
}

export default function NotFoundState({
  title,
  message,
  actionTo,
  actionLabel,
}: NotFoundStateProps) {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight uppercase">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-neutral-500">{message}</p>
      <ButtonLink to={actionTo} className="mt-8">
        {actionLabel}
      </ButtonLink>
    </Container>
  );
}
