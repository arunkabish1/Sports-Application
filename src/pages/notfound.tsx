import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
  
    const handleBackToHome = () => {
      navigate("/scorepanel");
    };

    return (
        <div>
          <h2>404 - Not Found</h2>
          <p>The page does not exist.</p>
          <button id="backToHomeButton" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      );
    };
    
    export default NotFound;