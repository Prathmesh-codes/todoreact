import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import {ic_cached} from 'react-icons-kit/md/ic_cached'


export const View = ({todos,deletetodo,updatetodo}) => {
    
    return todos.map(todo=>(
        
        <tr key={todo.ID}>
        
            <td>{todo.ID}</td>
            <td>{todo.Name}</td>
            <td className='delete-btn' onClick={()=>deletetodo(todo.Name)}>
                <Icon icon={trash}/>
            </td>      
            <td className='update-btn' onClick={()=>updatetodo(todo, todo.ID)}>
           <Icon icon={ic_cached}/>
            </td>                
        </tr>            
    
))
}