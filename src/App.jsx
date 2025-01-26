import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout.jsx';
import React, { useEffect } from 'react';
import CreateJoke from "./components/CreateJoke.jsx";
import ProductDetail from "./components/JokeDetail.jsx";
import JokesList from "./pages/JokesList.jsx";
import JokeDetail from "./components/JokeDetail.jsx";
import EditJoke from "./components/EditJoke.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <JokesList />,
            },
            {
                path: '/jokes/create',
                element: <CreateJoke />,
            },
            {
                path: '/jokes/:id',
                element: <JokeDetail />,
            },
            {
                path: '/jokes/:id/edit',
                element: <EditJoke />,
            },
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
