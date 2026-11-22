import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      return 'Todos los campos son obligatorios.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Ingresa un correo electrónico válido.';
    }
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    try {
      if (isRegister) {
        await register(email, password);
        setSuccessMsg('Cuenta creada con éxito. Redirigiendo...');
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMsg(
        error.message === 'Invalid login credentials'
          ? 'Credenciales incorrectas. Verifica tu correo y contraseña.'
          : error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">ShopPanel</h2>
          <p className="text-muted">
            {isRegister ? 'Crea una cuenta nueva' : 'Inicia sesión para gestionar tus pedidos'}
          </p>
        </div>

        {errorMsg && (
          <div className="alert alert-danger py-2" role="alert">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success py-2" role="alert">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={submitting}
          >
            {submitting
              ? 'Procesando...'
              : isRegister
              ? 'Registrarse'
              : 'Ingresar'}
          </button>
        </form>

        <hr className="my-3" />

        <div className="text-center">
          <button
            type="button"
            className="btn btn-link text-decoration-none btn-sm"
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg('');
              setSuccessMsg('');
            }}
          >
            {isRegister
              ? '¿Ya tienes cuenta? Inicia sesión aquí'
              : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  );
};