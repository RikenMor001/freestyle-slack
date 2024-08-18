
import { handlePasskeyAuthentication } from "freestyle-auth/passkey";
import type { AuthCS } from "../cloudstate/auth";
import { useCloud } from "freestyle-sh";
import { useState } from "react"

export default function Signup(){
    const auth = useCloud<typeof AuthCS>("auth")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div className="flex items-center justify-center min-h-screen bg-violet-400 ">
        <div className="bg-white shadow-lg rounded-lg wd-96 p-14">
            <div className="text-violet-800 text-3xl font-bold mb-10">
                Welcome to slack
            </div>
            <form>
                <div className="mb-6">
                    <div className="font-semibold text-lg text-black" > Username </div>
                    <input 
                    className="border rounded w-full py-2 px-2" 
                    id="Username" 
                    type="text" 
                    placeholder="Enter your username"
                    onChange = {async (e) => {
                        setUsername(e.target.value)     //Updates the state variable in the DOM everytime a new user adds credentials
                        const startReg = await auth.startRegistration(username)

                        const passkey = await handlePasskeyAuthentication(startReg)

                        await auth.finishRegistration(passkey)

                        window.location.href = "/"
                    }}                                  
                    />
                </div>

                <div className="mb-6">
                    <div className="font-semibold text-lg text-black" > Email </div>
                    <input className="border rounded w-full py-2 px-2" 
                    id="Email" 
                    type="email" 
                    placeholder="Enter your email id"
                    onChange={async (e) => {
                        setEmail(e.target.value)
                        const startReg = await auth.startRegistration(username)

                        const passkey = await handlePasskeyAuthentication(startReg)

                        await auth.finishRegistration(passkey)

                        window.location.href = "/"
                    }}
                    />
                </div>

                <div className="mb-6">
                    <div className="font-semibold text-lg text-black" > Password </div>
                    <input className="border rounded w-full py-2 px-2" 
                    id="Password" 
                    type="password" 
                    placeholder="Enter your Password"
                    onChange = {async (e)=> {
                        setPassword(e.target.value)
                        const startReg = await auth.startRegistration(username)

                        const passkey = await handlePasskeyAuthentication(startReg)

                        await auth.finishRegistration(passkey)

                        window.location.href = "/"
                    }}
                    />
                </div>

                <div className="flex items-center" >
                <button className="bg-violet-800 rounded-md shadow-lg text-white px-4 py-2 hover:bg-violet-600"
                        type = "submit">
                    SignUp
                </button>
            </div>
            </form>
        </div>
    </div>
}