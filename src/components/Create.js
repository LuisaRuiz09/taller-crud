import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

//datos de la base de datos
const Create = () => {
  const [ nombre, setNombre ] = useState('')
  const [ apellido, setApellido ] = useState('')
  const [ telefono, setTelefono ] = useState(0)
  const [ email, setEmail ] = useState('')
  const [ producto, setProducto ] = useState('')
  const [ cantidad, setCantidad ] = useState(0)
  const [ total, setTotal ] = useState(0)
  const navigate = useNavigate()

  const productsCollection = collection(db, "products")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( productsCollection, {  nombre: nombre, apellido:apellido, telefono: telefono, email: email, producto: producto, cantidad : cantidad, total : total} )
    navigate('/')
    //console.log(e.target[0].value)
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Agregar nuevo cliente</h1>
                 <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Apellido</label>
                        <input
                            value={apellido}
                            onChange={ (e)=> setApellido(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Telefono</label>
                        <input
                            value={telefono}
                            onChange={ (e)=> setTelefono(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            value={email}
                            onChange={ (e)=> setEmail(e.target.value)} 
                            type="email"
                            className='form-control'
                        />                 
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Producto</label>
                        <input
                            value={producto}
                            onChange={ (e)=> setProducto(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Cantidad</label>
                        <input
                            value={cantidad}
                            onChange={ (e)=> setCantidad(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Total</label>
                        <input
                            value={total}
                            onChange={ (e)=> setTotal(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>          
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                    
                    <p></p>
                 </form>   
            </div>
        </div>
    </div> 
  )
}

export default Create