import { Form, redirect, useActionData } from "react-router-dom";
import fetcher from "../config/fetcher";

import InputField from "../components/InputField";


// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    try {
        const res = await fetcher(
            `${import.meta.env.VITE_SERVER_HOST}/auth/login`,
            {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        
        if (res.status === 400 || res.status === 401) {
            return "Invalid email or password."
        }
        const payload = await res.json()

        //save the jwt in localStorage
        localStorage.setItem('jwt', JSON.stringify(payload.token))

        return redirect('/')
    } catch (err) {
        console.log(`Error: ${err}`)
        return redirect('/')
    }

}



export default function Login() {
    const loginErr = useActionData()
    return (
      <div className="d-grid gap-2 mx-auto" style={{maxWidth:"400px"}}>
        <p>{loginErr}</p>
        <Form method="post">
            <InputField
              type="email"
              name="email"
              ><span>Email address:</span>
            </InputField>
            <InputField
              type="password"
              name="password"
            >
              <span>Password:</span>
            </InputField>
            
                <button
                    type="submit"
                    className="btn btn-secondary"
                >
                Login
            </button>
        </Form>
      </div>
    )
}