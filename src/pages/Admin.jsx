import { useState, useEffect } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import { API } from '../components/admin/constants';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('beresin-admin-token'));
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`${API}/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((j) => setVerified(j.valid))
        .catch(() => setVerified(false));
    }
  }, [token]);

  if (!token || !verified) {
    return (
      <AdminLogin
        onLogin={(t) => {
          setToken(t);
          setVerified(true);
        }}
      />
    );
  }

  return (
    <AdminDashboard
      token={token}
      onLogout={() => {
        localStorage.removeItem('beresin-admin-token');
        setToken(null);
        setVerified(false);
      }}
    />
  );
}
