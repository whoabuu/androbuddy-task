import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight">
            ShopSphere
          </Link>
          <Link to="/products" className="text-sm font-medium hover:underline">
            All products
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
        ShopSphere demo · data from Fake Store API
      </footer>
    </div>
  );
}