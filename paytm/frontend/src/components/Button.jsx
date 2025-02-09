const Button = ({name, type}) => {
    return (
        <>
            <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 text-bg w-50 rounded"  type={type}>{name}</button>
        </>
    )
}

export default Button;