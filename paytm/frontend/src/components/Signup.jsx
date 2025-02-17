import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async(e) =>{
    e.preventDefault();
    try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password,
            });
            localStorage.setItem("token", response.data.token);
            
            console.log("Signup Successful: ",response.data);
            navigate("/dashboard")
            alert("Signup successful!")
    } catch (error) {
        console.error("Signup failed: ", error.response?.data || error.message);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="m-4">
            <h2 className="font-bold text-3xl text-blue-500">Register</h2>
          </div>
          <div className="m-4 ">
            <form onSubmit={handleSignup}  action="" className="flex flex-col">
                <InputBox
                    label="First Name"
                    type="text"
                    htmlFor="firstName"
                    id="firstName"
                    name="firstName"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    required
                />

                <InputBox
                    label="Last Name"
                    type="text"
                    htmlFor="lastName"
                    id="lastName"
                    name="lastName"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    required
                />
                    
                <InputBox
                    label="Email"
                    type="email"
                    htmlFor="email"
                    id="email"
                    name="email"
                    onChange={(e) => {
                    setUsername(e.target.value);
                    }}
                    required
                />

                <InputBox
                    label="Password"
                    type="password"
                    htmlFor="password"
                    id="password"
                    name="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                />

                <Button type="submit" label="Submit" />
            </form>
            <p className="mt-2 text-center">
              Have an Account?
              <a
                href=""
                onClick={() => navigate("/signin")}
                className="text-blue-700 underline"
              >
                {" "}
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
