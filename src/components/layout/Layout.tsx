import { Link, NavLink, Outlet } from "react-router-dom";
import Container from "./Container";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "All Products", end: false },
];

function navClass({ isActive }: { isActive: boolean }): string {
  return `border-b-2 py-1 font-medium transition-colors ${
    isActive ? "border-black" : "border-transparent hover:border-neutral-400"
  }`;
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-surface py-2 text-center text-xs font-medium">
        Demo store · Free shipping on orders over $50
      </div>

      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <Container className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-extrabold uppercase italic tracking-tighter"
          >
            ShopSphere
          </Link>
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={navClass}>
                {label}
              </NavLink>
            ))}
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-black py-10 text-neutral-400">
        <Container className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-lg font-extrabold uppercase italic tracking-tighter text-white">
            ShopSphere
          </span>
          <span>© 2026 ShopSphere demo · Data from Fake Store API</span>
        </Container>
      </footer>
    </div>
  );
}
