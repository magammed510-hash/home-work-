
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import style from './card2.module.css'

const API = 'https://to-dos-api.softclub.tj/api/to-dos'
const api = 'https://to-dos-api.softclub.tj/'

function DIV2() {
  const [user, setUser] = useState<any[]>([])
  const [di, setDi] = useState(false)
  const [editid, setId] = useState<any>(null)

  async function getData() {
    try {
      const { data } = await axios.get(API)
      setUser(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  async function delUser(id: number | string) {
    try {
      await axios.delete(`${API}?id=${id}`)
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: null as File | null
    },

    onSubmit: async (values) => {
      try {
        if (editid !== null) {
          await axios.put(API, {
            id: editid,
            name: values.name,
            description: values.description
          })
        } else {
          const formData = new FormData()

          formData.append('name', values.name)
          formData.append('description', values.description)

          if (values.image) {
            formData.append('images', values.image)
          }

          await axios.post(API, formData)
        }

        formik.resetForm()
        setId(null)
        setDi(false)
        getData()

      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <div className={style.container}>

      <header className={style.header}>
        <h1>To-Do List</h1>

        <button
          className={style.addBtn}
          onClick={() => {
            formik.resetForm()
            setId(null)
            setDi(true)
          }}
        >
          + Add New User
        </button>
      </header>

      {di && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>

            <h3>{editid !== null ? 'Edit User' : 'Add New User'}</h3>

            <form onSubmit={formik.handleSubmit} className={style.form}>

              <input
                type="text"
                name="name"
                value={formik.values.name}
                placeholder="Name..."
                onChange={formik.handleChange}
                required
              />

              <input
                type="text"
                name="description"
                value={formik.values.description}
                placeholder="Description..."
                onChange={formik.handleChange}
                required
              />

              <input
                type="file"
                className={style.fileInput}
                onChange={(e) => {
                  formik.setFieldValue(
                    'image',
                    e.target.files ? e.target.files[0] : null
                  )
                }}
              />

              <div className={style.modalBtns}>

                <button
                  type="button"
                  className={style.cancelBtn}
                  onClick={() => {
                    formik.resetForm()
                    setId(null)
                    setDi(false)
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className={style.saveBtn}>
                  Save
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      <div className={style.gridContainer}>

        {user.map((elem: any) => (
          <div className={style.box} key={elem.id}>

            <div className={style.imgContainer}>
              <img
                className={style.img}
                src={api + 'images/' + elem?.images?.[0]?.imageName}
                alt="user"
              />
            </div>

            <div className={style.cardBody}>

              <h2>{elem.name}</h2>
              <p>{elem.description}</p>

              <div className={style.cardBtns}>

                <button
                  className={style.editBtn}
                  onClick={() => {
                    formik.setValues({
                      name: elem.name,
                      description: elem.description,
                      image: null
                    })

                    setId(elem.id)
                    setDi(true)
                  }}
                >
                  Edit
                </button>

                <button
                  className={style.deleteBtn}
                  onClick={() => delUser(elem.id)}
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default DIV2
