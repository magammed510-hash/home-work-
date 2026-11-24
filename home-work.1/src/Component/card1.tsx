
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import style from './card1.module.css'

const API = 'https://to-dos-api.softclub.tj/api/to-dos'
const api = 'https://to-dos-api.softclub.tj/'

function DIV1() {
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
    <div>
      <button onClick={() => {
        formik.resetForm()
        setId(null)
        setDi(true)
      }}>
        Add New User+
      </button>

      <div className={style.div}>

        {di && (
          <div className={style.dialogAdd}>

            <form onSubmit={formik.handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Name..."
                value={formik.values.name}
                onChange={formik.handleChange}
              />

              <input
                type="text"
                name="description"
                placeholder="Description..."
                value={formik.values.description}
                onChange={formik.handleChange}
              />

              <input
                type="file"
                onChange={(e) => {
                  formik.setFieldValue(
                    'image',
                    e.target.files ? e.target.files[0] : null
                  )
                }}
              />

              <button
                type="button"
                onClick={() => {
                  formik.resetForm()
                  setId(null)
                  setDi(false)
                }}
              >
                Cancel
              </button>

              <button type="submit">
                Save
              </button>

            </form>
          </div>
        )}

        {user.map((elem: any) => (
          <div className={style.box} key={elem.id}>

            <img
              className={style.img}
              src={api + 'images/' + elem?.images?.[0]?.imageName}
              alt=""
              width="200"
            />

            <h1>{elem.name}</h1>
            <p>{elem.description}</p>

            <button onClick={() => delUser(elem.id)}>
              Delete
            </button>

            <button onClick={() => {
              formik.setValues({
                name: elem.name,
                description: elem.description,
                image: null
              })

              setId(elem.id)
              setDi(true)
            }}>
              Edit
            </button>

          </div>
        ))}

      </div>
    </div>
  )
}

export default DIV1
