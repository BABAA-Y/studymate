import { useLocation } from "react-router-dom";

function PageAnimation({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="fade-in">
      {children}
    </div>
  );
}

export default PageAnimation;