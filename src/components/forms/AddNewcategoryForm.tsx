import { addCategory } from '@/actions/add-category'
import React from 'react'

function AddNewcategoryForm() {
  return (
    <form action={addCategory}>
			<input
				hidden
				id='creator'
				name='creator'
				// defaultValue={creator}
				/>
    </form>
  )
}

export default AddNewcategoryForm