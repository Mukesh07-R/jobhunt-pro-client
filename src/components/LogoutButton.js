import { useNavigate } from "react-router-dom";

function LogoutButton(){
    const navigate =useNavigate();

    const handlelogout =()=>{
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
         navigate("/");
    };

    return(
        <button
        onClick ={handlelogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Logout
        </button>
    )
};


export default LogoutButton;