import Button from "./Button";
import InputField from "./InputField";

const Signup = () => {
  return (
    <>
        <div>
            <div>
                <h2>Sign Up</h2>
                <form className="flex flex-col">
                    <InputField label={"First Name"} type={"text"} name={"firstName"} id={"firstName"} placeholder={"John"} />

                    <InputField label={"Last Name"} type={"text"} name={"lastName"} id={"lastName"} placeholder={"Doe"} />

                    <InputField label={"Username"} type={"text"} name={"username"} id={"username"} />

                    <InputField label="Password" type="password" name="password" id="password"/>

                    <Button type={"button"} name={"Submit"} />
                </form>
            </div>
        </div>
    </>
    
    
  );
};

export default Signup;
