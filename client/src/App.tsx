import {
  useQuery
} from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getMe } from './api/auth';
import AuditTable from './components/Audit/AuditTable';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

function App() {
  return (
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <AuditTable />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const me = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  });

  if (me.isPending) {
    return <h1>Loading...</h1>
  }

  if (!me.isPending && me.data.user === null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App
