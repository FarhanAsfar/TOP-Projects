import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-cyan-600 m-4">
                <nav className="flex items-center justify-between m-2 p-2">
                    <a href="" onClick={() => navigate("/")} className="font-extrabold text-2xl">Paytm App</a>
                    
                    <div className="flex items-center gap-4 ">
                        <h2 className="">Hello</h2>
                        <button className="border-2 rounded-lg text-xl p-1">User</button>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Dashboard;