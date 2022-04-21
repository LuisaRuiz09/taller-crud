import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configurar los hooks
  const [products, setProducts] = useState( [] )

  //2 - referenciar a la DB firestore
  const productsCollection = collection(db, "products")

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async ()   => {
   const data = await getDocs(productsCollection)
   //console.log(data.docs)
   setProducts(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
   const productDoc = doc(db, "products", id)
   await deleteDoc(productDoc)
   getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar el cliente?',
      text: "No seras capaz de restaurarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamar a la fcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          'Eliminado',
          'Cliente ha sido eliminado',
          'success'
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect( () => {
    getProducts()
    // eslint-disable-next-line
  }, [] )
  //7 - devolver vista de nuestro componente
  //campos de la base de datos
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Lista de clientes</h1>
          <table className='table table-hover'>
          <thead> 
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
           </thead>
            <tbody>
              { products.map( (product) => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>{product.apellido}</td>
                  <td>{product.telefono}</td>
                  <td>{product.email}</td>
                  <td>{product.producto}</td>
                  <td>{product.cantidad}</td>
                  <td>{product.total}</td>

                  <td>
                    <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-success mt-2 mb-2'>Agregar</Link>    
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}

//Commit de mostrar la lista
export default Show