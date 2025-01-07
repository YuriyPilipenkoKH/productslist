import React from 'react'

interface FormWrappingUIProps {
  id:string,
  name: string,
}

const FormWrappingUI:React.FC<FormWrappingUIProps> = ({
	id, name
	}) => {
  return (
    <div>FormWrappingUI</div>
  )
}

export default FormWrappingUI