import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import Button from "./Button";

const Signin = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="m-4">
            <h2 className="font-bold text-3xl text-blue-500">Login</h2>
          </div>
          <div className="m-4 ">
            <form action="" className="flex flex-col">
              <InputBox
                label="Email"
                type="email"
                htmlFor="email"
                id="email"
                name="email"
              />

              <InputBox
                label="Password"
                type="password"
                htmlFor="password"
                id="password"
                name="password"
              />

              <Button type="submit" label="Submit" />
            </form>
            <p className="mt-2 text-center">
              Do not have an Account?
              <a
                href=""
                onClick={() => navigate("/")}
                className="text-blue-700 underline"
              >
                {" "}
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
