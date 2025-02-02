import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-text font-sans">
            <header className="bg-primary text-white p-6 shadow-card">
                <nav className="flex gap-8 justify-center">
                    <Link to={`/`} className="text-2xl font-bold hover:text-secondary transition-all">Home</Link>
                    <Link to={`/jokes/create`} className="text-2xl font-bold hover:text-secondary transition-all">Post a Joke</Link>
                </nav>
            </header>

            <main className="flex-grow p-8 flex justify-center">
                <div className="max-w-4xl w-full space-y-8">
                        <Outlet />
                    </div>
            </main>
        </div>
    );
}

export default Layout;
