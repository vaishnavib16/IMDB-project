import React,{useState} from 'react'


function AddProducer() {
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [bio, setBio] = useState("")

    const handleClick = async () => {
        console.log({ name, gender, age, bio });
        
        let result = await fetch('http://localhost:8000/api/add/producer', {
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
            <h2 >Add Producer</h2>
            <input type="text" placeholder=' Enter Producer Name' onChange={(e) => { setName(e.target.value) }} value={name} />
            <textarea type="text" placeholder=' Enter Producer Description' onChange={(e) => { setBio(e.target.value) }} value={bio} />
            <input type="text" placeholder=' Enter Age' onChange={(e) => { setAge(e.target.value) }} value={age} />
            <input type="text" placeholder=' Gender' onChange={(e) => { setGender(e.target.value) }} value={gender} />
            
            <button type='submit' onClick={handleClick}>Add Producer</button>
        </div>
    )
}

export default AddProducer