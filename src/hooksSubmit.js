import { useState } from "react";

export function useFormSubmit(initialValue) {

    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange,
    }
}