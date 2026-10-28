import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { fileToDataUrl } from '../../utils/helpers'

const EMPTY = { name: '', price: '', category: '', description: '', stock: '', image: '' }

// One form for both "Add product" (/admin/products/new) and "Edit product" (/admin/products/:id/edit)
export default function ProductForm() {
  const { id } = useParams()
  const { products, addProduct, updateProduct } = useShop()
  const editing = products.find((p) => p.id === Number(id))
  const isEdit = Boolean(id)

  const [form, setForm] = useState(editing ? { ...editing, price: String(editing.price), stock: String(editing.stock) } : EMPTY)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  if (isEdit && !editing) {
    return (
      <div className="auth-body"><div className="auth-container">
        <h2>Product not found</h2>
        <Link to="/admin" style={{ color: '#ff6b35' }}>Back to Admin</Link>
      </div></div>
    )
  }

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const pickImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try { setForm({ ...form, image: await fileToDataUrl(file) }) }
    catch { setError('Could not read that image. Try another one.') }
  }

  const submit = (e) => {
    e.preventDefault()
    setSuccess('')
    if (!form.image) return setError('Please upload a product image!')
    const data = {
      name: form.name.trim(), price: parseFloat(form.price), category: form.category,
      description: form.description.trim(), stock: parseInt(form.stock, 10), image: form.image,
    }
    if (isEdit) { updateProduct(editing.id, data); setSuccess('Product updated!') }
    else { addProduct(data); setSuccess('Product added successfully!'); setForm(EMPTY); e.target.reset() }
    setError('')
  }

  return (
    <div className="auth-body">
      <div className="auth-container" style={{ maxWidth: 600 }}>
        <h2><i className={`fa ${isEdit ? 'fa-edit' : 'fa-plus'}`}></i> {isEdit ? 'Edit Product' : 'Add New Product'}</h2>
        <Link to="/admin" style={{ color: '#ff6b35', textDecoration: 'none' }}><i className="fa fa-arrow-left"></i> Back to Admin</Link><br /><br />

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {form.image && <img src={form.image} alt="preview" width="100" style={{ borderRadius: 10, marginBottom: 15, background: '#fff' }} />}

        <form onSubmit={submit}>
          <div className="input-group"><i className="fa fa-tag"></i>
            <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={change} required /></div>
          <div className="input-group"><i className="fa fa-dollar-sign"></i>
            <input type="number" name="price" placeholder="Price (e.g. 120.00)" step="0.01" min="0" value={form.price} onChange={change} required /></div>
          <div className="input-group"><i className="fa fa-list"></i>
            <select name="category" value={form.category} onChange={change} required>
              <option value="">Select Category</option>
              <option value="New Arrivals">New Arrivals</option>
              <option value="Collection">Collection</option>
            </select></div>
          <div className="input-group textarea-group"><i className="fa fa-align-left"></i>
            <textarea name="description" rows="3" placeholder="Product Description" value={form.description} onChange={change} required /></div>
          <div className="input-group"><i className="fa fa-cubes"></i>
            <input type="number" name="stock" placeholder="Stock Quantity" min="0" value={form.stock} onChange={change} required /></div>
          <div className="input-group"><i className="fa fa-image"></i>
            <input type="file" accept="image/*" onChange={pickImage} /></div>
          <button type="submit" className="auth-btn">
            <i className={`fa ${isEdit ? 'fa-save' : 'fa-plus'}`}></i> {isEdit ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}
