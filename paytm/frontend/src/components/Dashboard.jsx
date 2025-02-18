import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    const handleSendMoney = () => {
        navigate("/send-money")
    }
    
    useEffect(() => {
        const timeout = setTimeout(() => {
                axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
                .then(response => {
                setUsers(response.data.user);
            })
        }, 1000);
        
        return () => clearTimeout(timeout);
    }, [filter])
    // console.log(users)

    return (
        <>
            <div className="m-4 border-blue-700">
                <nav className=" border-2 flex items-center justify-between p-2">
                    <a href="" onClick={() => navigate("/")} className="font-extrabold text-2xl text-blue-500">Paytm App
                    </a>
                    
                    <div className="flex items-center gap-4 ">
                        <h2 className="">Hello</h2>
                        <button className="border-2 rounded-full text-xl p-1 hover:bg-gray-50">User</button>
                    </div>
                </nav>

                <div className="mt-4 p-2 border-2">
                    <p className="font-bold font-mono">Your current balance is: 113,345.00TK</p>
                </div>

                <div className=" mt-4">
                    <p className="text-2xl font-bold mt-9">Users</p>
                    <div className="relative">
                        <input onChange={(e) => {
                            setFilter(e.target.value)
                        }} 
                        type="search" 
                        className="block border rounded-lg p-4 w-full ps-10 border-gray-200 text-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600" 
                        placeholder="Search..."/>

                        <button className="border rounded-lg  absolute end-2.5 bottom-2 text-white bg-blue-600 hover:bg-blue-800 font-medium px-4 py-2">Search</button>    
                    </div>

                    
                    {users.map(user => (
                        <div key={user._id} className=" mt-4 flex justify-between">
                            <div className="ps-5 p-4 font-bold">
                                {user.username}
                            </div>
                            <div>
                                <button onClick={handleSendMoney} className="border rounded-lg text-white bg-blue-600 hover:bg-blue-800 font-medium m-2 px-4 py-2">Send Money</button>    
                            </div> 
                        </div>
                    ))}
                        
                        
                    
                </div>
            </div>
        </>
    )
}

export default Dashboard;