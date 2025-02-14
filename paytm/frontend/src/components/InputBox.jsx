const InputBox = ({label, type, name, id, htmlFor, onChange}) => {
    return (
        <>
            <label htmlFor={htmlFor}>{label}</label>
              <input
                type={type}
                name={name}
                id={id}
                className="border-2 rounded mb-3 px-2 py-1"
                onChange={onChange}
              />
        </>
    )
}

export default InputBox;