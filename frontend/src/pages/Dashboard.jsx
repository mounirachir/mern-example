import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    user && (
      <div>
        <h1>
          welcome <span className="text-primary">{user.name}</span>
        </h1>
      </div>
    )
  );
};

export default Dashboard;
