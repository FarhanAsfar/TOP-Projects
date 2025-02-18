const SendMoney = () => {

    return (
        <>
            <div className="flex flex-col m-20 items-center border-2">
                <div className="">
                    <h1 className="font-semibold text-2xl text-black p-2">SEND MONEY TO</h1>
                </div>
                <div className="flex flex-col m-2">
                    <h2 className="text-center font-semibold">Farhan Asfar</h2>

                    <div className="flex flex-col m-2">
                       <label htmlFor="amount">Amount:</label>
                        <input type="number" name="amount" id="amount" 
                        placeholder="10000" className="border-2 ps-5 mt-2"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <button  className="border-2 rounded-lg text-white bg-blue-600 hover:bg-blue-800 font-medium m-4 w-30 py-2">Transfer</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SendMoney;