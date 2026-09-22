"use client";

import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('marlene_user');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const login = (payload: { name: string; email: string; role: string }) => {
    localStorage.setItem('marlene_user', JSON.stringify(payload));
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem('marlene_user');
    setUser(null);
  };

  return { user, login, logout };
}
