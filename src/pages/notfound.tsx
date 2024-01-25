import { useNavigate } from "react-router-dom";
import notfund from "../assets/not-found.gif";
const NotFound = () => {
    const navigate = useNavigate();
  
    const handleBackToHome = () => {
      navigate("/scorepanel");
    };

    return (
        <div className="flex flex-col items-center justify-center">
          <img className="w-1/3" src={notfund} alt="Not Found" />
          <p className="font-bold p-2">Sorry,Requested Page Not Found</p>
          <button className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" id="backToHomeButton" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      );
    };
    
    export default NotFound;