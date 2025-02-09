const InputField = ({label, type, name, id, placeholder}) => {
    return(
        <>
            <div>
                <label htmlFor={name}>{label}</label>
                <input type={type} name={name} id={id} placeholder={placeholder} required/>
            </div>
        </>
    )
}

export default InputField;