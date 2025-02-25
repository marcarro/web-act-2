'use client'

import { useState } from "react";
import { useUser } from '@/app/context/UserContext'
import LoginFormElement from "@/app/components/LoginFormElement";

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: ''
  });
  const [alerts, setAlerts] = useState<string[]>([])
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      setUser(formData.nombre.trim());
      setIsLoggedIn(true);
    }
  }

  const validateFields = () => {
    setAlerts([]);
    const errors: string[] = []

    validateName(formData.nombre, errors);
    validateCorreo(formData.correo, errors);
    validatePassword(formData.password, errors);

    setAlerts(errors);
    return errors.length == 0
  }

  const validateName = (name: string, errors: string[]) => {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      errors.push('El nombre no puede estar vacío');
    }
  }

  const validateCorreo = (correo: string, errors: string[]) => {
    const trimmedMail = correo.trim();
    if (trimmedMail.length === 0) {
      errors.push('El correo no puede estar vacío');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errors.push('Correo inválido');
    }
  }

  const validatePassword = (password: string, errors: string[]) => {
    if (password.length === 0) {
      errors.push('La contraseña no puede estar vacía');
      return;
    }

    if (password.length < 8) {
      errors.push('La contraseña necesita tener al menos 8 carácteres');
    }
  }

  return (
    <div>
      {isLoggedIn && (
        <div className="fixed top-0 right-0 p-4 text-slate-300 text-xl font-bold">
        <span>{user}</span>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setFormData({ nombre: "", correo: "", password: "" });
            setAlerts([]);
          }}
          className="ml-4 mt-4 text-blue-500 hover:text-blue-400 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
      )}

      <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-tr from-gray-900 to-gray-950">
        <div className="bg-gray-800/30 backdrop-blur-lg p-10 rounded-2xl w-full max-w-md mx-4 shadow-xl border border-gray-700/30">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-semibold text-white mb-8 text-center">Inicia sesión</h1>
            <LoginFormElement
              title="Nombre"
              placeholder="Ingresa tu nombre"
              value={formData.nombre}
              onChange={(value) => handleInputChange('nombre', value)}
            />
            <LoginFormElement
              title="Correo"
              placeholder="Ingresa tu correo"
              value={formData.correo}
              onChange={(value) => handleInputChange('correo', value)}
            />
            <LoginFormElement
              title="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              type="password"
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800">
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="mt-6 space-y-2">
          {alerts.map(alert => (
            <p key={alert} className="text-red-400 text-sm font-normal bg-red-500/10 px-4 py-2 rounded-md border border-red-500/20">
              {alert}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
