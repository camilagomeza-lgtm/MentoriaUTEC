import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

export default function {
    const [form, setForm] = useState({name:"", email:"", password:""});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    function handleChange(e:ChangeEvent<HTMLInputElement>) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    function validar(): string {
        if (form.name.trim().length > 100) return "El nombre no es válido";
        if (!form.email.includes("@")) return "El correo es inválido";
        if (form.password.trim().length < 8 || form.password.trim().length > 72) return "La contraseña no cumple con los resquisitos";
        return "";
    }

    function handleSubmit (e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const msj = validar();

        if (msj) {
            setError(msj);
            return "";
        }

        try {
            await registerUser(form);
            setSuccess("¡Se registró correctamente!")
            setTimeout( () => navigate("/login"), 1500)
        } catch (er: any) {
            setError(er.response?.data?.error || "No se pudo realizar el registro ...")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Registro</h1>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre"/>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email"/>
            <input name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" type="password"/>
            <button>Registrarse</button>
        </form>
    );
};