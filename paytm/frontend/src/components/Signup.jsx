import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="border-3 flex flex-col items-center m-24">
        <div className="m-4">
          <h2 className="font-bold text-3xl text-blue-500">Register</h2>
        </div>
        <div className="m-4 ">
          <form action="" className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="border-2 rounded mb-3 px-2 py-1"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 rounded mb-3 px-2 py-1"
            />

            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border-2 rounded mb-3 px-2 py-1"
            />

            <button
              type="submit"
              className="mt-4 py-2 bg-transparent hover:bg-blue-500 text-blue-600 border-2 border-blue-500
                    font-semibold hover:text-white hover:border-transparent rounded-full"
            >
              Submit
            </button>
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
    </>
  );
};

export default Signup;
