const Button = ({type, label}) => {
  return (
    <button
      type={type}
      className="mt-4 py-2 bg-transparent hover:bg-blue-500 text-blue-600 border-2 border-blue-500
                    font-semibold hover:text-white hover:border-transparent rounded-full"
    >{label}</button>
  );
};

export default Button;
