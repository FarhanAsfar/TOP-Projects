import axios from "axios";
import {  useState } from "react";
import { useLocation } from "react-router";

const SendMoney = () => {
    const location = useLocation();
    const {username, id} = location.state || {};
    const [amount, setAmount] = useState(0);

    const handleTransfer = async () =>{
        if(!amount || amount<=0){
            alert("please enter a valid amount");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/user/transfer/`,
                {
                    to: id,
                    amount: amount,
                },
                {
                    headers: {
                        Authorization: "Bearer "+ localStorage.getItem("token")
                    }
                }
            );
            console.log("Money transferred successfully", response.data);
            alert("Transfer Succesful!");
        } catch (error) {
            console.error("Transfer failed", error);
        } 

    }
        

    return (
        <>
            <div className="flex flex-col m-20 items-center">
                <div className="">
                    <h1 className="font-semibold text-2xl text-black  p-2">SEND MONEY TO</h1>
                </div>
                <div className="flex flex-col m-2">
                    <h2 className="text-center text-2xl font-semibold">{username}</h2>
                    {console.log(username)}
                    <div className="flex flex-col m-2">
                       <label htmlFor="amount">Amount:</label>
                        <input onChange={(e) => {
                            setAmount(e.target.value)
                        }} type="number" name="amount" id="amount" 
                        placeholder="10000" className="border-2 ps-5 mt-2"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <button onClick={handleTransfer}  className="border-2 rounded-lg text-white bg-blue-600 hover:bg-blue-800 font-medium m-4 w-30 py-2">Transfer</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SendMoney;