import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('todos');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}


export const App = () => {

  // Users array of objects
  const [todos, settodos]=useState(getDatafromLS());

  // input field state
  const [Name, setName]=useState('');

  // form submit event
  const handleAddtodoSubmit=(e)=>{
    e.preventDefault();

    //creating ID 
    const date=new Date();
    const time=date.getTime();


    // creating an object
    let todo={
      ID:time,
      Name,
    
    }
    settodos([...todos,todo]);
    setName('');

  }

  //id state
  const [id, setId]=useState();

  const [editForm,seteditform]=useState(false);


  // delete a task from local storage
  const deletetodo=(Name)=>{
    const filteredtodos=todos.filter((element,index)=>{
      return element.Name !== Name
    })
    settodos(filteredtodos);
  }


  //updating a task 
  const updatetodo=(todo,index)=>{
   
seteditform(true);

setName(todo.Name);
setId(index);
      
   
  }


  const handleEditSubmit=(e)=>{
    e.preventDefault();
 
    let items = [...todos];
    
    let item = items[id];
   
     console.log(item);
  }


  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])

  return (
    <div className='wrapper'>
      <h1>Todo List App</h1>
      <p>Add and view todos using local storage</p>
      
      
      <div className='main'>

      {editForm===false&&(

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddtodoSubmit}>

            <label>Task </label>
            <input type="text" className='form-control' required
            onChange={(e)=>setName(e.target.value)} value={Name}></input>
            <br></br>

            
            <button type="submit" className='btn btn-success btn-md'>
              ADD TODO to the list
            </button>
          </form>
        </div>

      )}


{editForm===true&&(

<div className='form-container'>
  <form autoComplete="off" className='form-group'
  onSubmit={handleEditSubmit}>

    <label>Task </label>
    <input type="text" className='form-control' required
    onChange={(e)=>setName(e.target.value)} value={Name}></input>
    <br></br>

    
    <button type="submit" className='btn btn-success btn-md'>
      Update
    </button>
  </form>
</div>

)}


        

        <div className='view-container'>
          {todos.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                   
                    <th>Name</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  <View todos={todos} deletetodo={deletetodo} updatetodo={updatetodo}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>settodos([])}>Remove All</button>
          </>}
          {todos.length < 1 && <div>No TODOS Added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App