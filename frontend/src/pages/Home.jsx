import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-4xl font-bold">Banking App</h1>
      <p className="text-gray-500">Manage accounts, deposit, withdraw, and transfer funds.</p>
      <div className="space-x-4">
        <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded">Sign Up</Link>
        <Link to="/login" className="px-4 py-2 bg-gray-500 text-white rounded">Login</Link>
      </div>
    </div>
  );
};

export default Home;
