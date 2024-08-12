import React,{useState} from 'react'

function AddCategory() {
    const [name, setName] = useState("")
    
    const handleClick = async () => {
        console.log({ name });
        
        let result = await fetch('http://localhost:8000/api/category/create', {
            method: 'post',
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log("result:", result)
    }
    return (
        <div className='form'>
            <h2 >Add Category</h2>
            <input type="text" placeholder=' Enter Category Name' onChange={(e) => { setName(e.target.value) }} value={name} />
            
            <button type='submit' onClick={handleClick}>Add Category</button>
        </div>
    )
}

export default AddCategory