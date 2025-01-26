import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <div id="root">
            <header>
                <nav className="nav-bar">
                    <Link to={`/`} className="nav-link">Home</Link>
                    <Link to={`/jokes/create`} className="nav-link">Post a joke</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
