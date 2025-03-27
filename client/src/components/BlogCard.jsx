import { Link } from "react-router-dom";

const BlogCard = ({ title, description, path }) => {
  return (
    <Link to={path} className="block">
      <div className="p-4 border rounded-xl shadow-md hover:shadow-lg transition">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
