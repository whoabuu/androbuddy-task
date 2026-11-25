import { routes } from "../../utils/routes";
import Container from "../layout/Container";
import { ButtonLink } from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-br from-neutral-950 via-neutral-800 to-neutral-600"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 -z-10 h-128 w-lg rounded-full bg-white/10 blur-3xl"
      />

      <Container className="flex min-h-104 flex-col justify-end gap-6 py-12 sm:min-h-136 lg:py-16">
        <p className="text-sm font-medium tracking-widest text-neutral-300 uppercase">
          New season
        </p>
        <h1 className="max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-tighter uppercase italic sm:text-7xl lg:text-8xl">
          Move. Wear. Repeat.
        </h1>
        <p className="max-w-md text-lg text-neutral-300">
          Everyday essentials, jewelry and tech, picked for the way you live.
        </p>
        <div>
          <ButtonLink to={routes.products} variant="inverse">
            Shop now
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
