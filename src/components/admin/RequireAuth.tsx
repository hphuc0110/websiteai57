import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RequireAuth() {
  const { user, loading, configured } = useAuth()
  const location = useLocation()

  if (!configured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-xl font-extrabold text-hero-navy">Chưa cấu hình Supabase</h1>
        <p className="mt-3 text-sm text-gray-600">
          Thêm <code className="rounded bg-gray-100 px-1">VITE_SUPABASE_URL</code> và{' '}
          <code className="rounded bg-gray-100 px-1">VITE_SUPABASE_ANON_KEY</code> vào file{' '}
          <code className="rounded bg-gray-100 px-1">.env</code> rồi khởi động lại server.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Đang kiểm tra phiên đăng nhập…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/dang-nhap" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
