import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Hexlet Chat
            </Link>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
