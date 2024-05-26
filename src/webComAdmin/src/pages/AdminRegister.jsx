
//AdminRegister.jsx
import { useState } from 'react';
import axios from 'axios';

const AdminRegister = () => {
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Verificar se os campos estão preenchidos
    if (!adminName || !email || !password) {
      setFormError('Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/admins/register', { adminName, email, password, role: 'admin' });
      console.log('Registration response:', response.data);
      alert('Novo administrador registrado com sucesso!');
      setAdminName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Error registering admin:', err);
      setError('Erro ao registrar administrador.');
    }
    
    setLoading(false);
  };

  return (
    <div>
      <div className="relative -mx-4 flex flex-col p-4">
        <div className="pb-6 flex flex-col items-center justify-center">
            <h1 className="buynow-card-title">Register Admin</h1>
            <div className="buynow-input-text"></div>
            <form onSubmit={handleRegister}>
              <div className="buynow-input-text">
                <input
                  className="w-full p-1 text-white"
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder=" AdminName"
                />
              </div>
              <div className="buynow-input-text">
                <input
                  className="w-full p-1 text-white"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" Email"
                />
              </div>
              <div className="buynow-input-text">
                <input
                  className="w-full p-1 text-white"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" Password"
                />
              </div>
              <div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
                {error && <p>{error}</p>}
                {formError && <p>{formError}</p>}
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default AdminRegister;