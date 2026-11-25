import { useEffect, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export default function Layout() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `border-b-2 py-1 font-medium transition-colors ${
      isActive ? "border-black" : "border-transparent hover:border-neutral-400"
    }`;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-surface py-2 text-center text-xs font-medium">
        Free shipping on orders over $50
      </div>

      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <Container className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold uppercase italic tracking-tighter">
            ShopSphere
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navClass}>
              All Products
            </NavLink>
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
          <span>© 2026 ShopSphere</span>
        </Container>
      </footer>
    </div>
  );
}