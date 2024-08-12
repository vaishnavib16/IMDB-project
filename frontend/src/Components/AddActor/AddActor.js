import React,{useState} from 'react'

function AddActor() {
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [bio, setBio] = useState("")

    const handleClick = async () => {
        console.log({ name, gender, age, bio });
        
        let result = await fetch('http://localhost:8000/api/add/actor', {
            method: 'post',
            body: JSON.stringify({ name, gender, age, bio }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        result = await result.json();
        console.log("result:", result)
        

    }

    return (
        <div className='form'>
            <h2 >Add Actor</h2>
            <input type="text" placeholder=' Enter Actor Name' onChange={(e) => { setName(e.target.value) }} value={name} />
            <textarea type="text" placeholder=' Enter Actor Description' onChange={(e) => { setBio(e.target.value) }} value={bio} />
            <input type="text" placeholder=' Enter Age' onChange={(e) => { setAge(e.target.value) }} value={age} />
            <input type="text" placeholder=' Gender' onChange={(e) => { setGender(e.target.value) }} value={gender} />
            
            <button type='submit' onClick={handleClick}>Add Actor</button>
        </div>
    )
}

export default AddActor
