import { Form, redirect, useActionData, useNavigate } from "react-router-dom"
import Modal from "../components/Modal";
import fetcher from "../config/fetcher";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  try {
    const formData = await request.formData()
    const res = await uploadFile(formData)
    console.log(res)
    return redirect("/home");
  } catch (err) {
    return err.message
  }
}


export default function NewArticle() {
  const modal = true;
  const navigate = useNavigate();
  const error = useActionData();

  return (
    <>
      <Modal
        openModal={modal}
        closeModal={()=>navigate('/home')}
      >
        <h1>New Article</h1>
        { error ? <p> {error} </p> : null }
      <Form method="post" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label" htmlFor="title">Title</label>
          <input type="text" name="articleTitle" id="title" className="form-control"/>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="file">Upload file</label>
            <input type="file" name="upload" accept=".md,text/markdown" className="form-control" id="file" />
          </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="number">Number</label>
          <input type="number" name="number" id="number" className="form-control"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
      </Modal>
    </>
    
  )
}


async function uploadFile(formData) {
  try {
    const res = await fetcher(
      `${import.meta.env.VITE_SERVER_HOST}/posts/upload`,
      {
        method: 'post',
        body: formData,
      }
    )
    const data = await res.json()
    if (res.status == 400) throw new Error(data.message)
    return { data };
    
  } catch (err) {
    throw new Error(err.message)
  }
}