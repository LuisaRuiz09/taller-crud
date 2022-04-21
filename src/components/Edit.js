import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    const [ nombre, setNombre ] = useState('')
    const [ apellido, setApellido ] = useState('')
    const [ telefono, setTelefono ] = useState(0)
    const [ email, setEmail ] = useState('')
    const [ producto, setProducto ] = useState('')
    const [ cantidad, setCantidad ] = useState(0)
    const [ total, setTotal ] = useState(0)
    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "products", id)
        const data = { nombre: nombre, apellido:apellido, telefono: telefono, email: email, producto: producto, cantidad : cantidad, total : total}
        await updateDoc(product, data)
        navigate('/')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "products", id) )
        if(product.exists()) {
            //console.log(product.data())
            setNombre(product.data().nombre)
            setApellido(product.data().apellido)
            setTelefono(product.data().telefono)
            setEmail(product.data().email)
            setProducto(product.data().producto)
            setCantidad(product.data().cantidad)
            setTotal(product.data().total)
            
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar cliente</h1>
                 <form onSubmit={update}>
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
                            type="text"
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
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                    <p></p>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default Edit