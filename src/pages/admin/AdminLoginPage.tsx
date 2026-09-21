import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLoginPage() {
  const { user, loading, configured, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from || '/admin/tin-tuc'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-light/50 via-white to-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-primary/15 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Quản trị</p>
        <h1 className="mt-2 text-2xl font-extrabold text-hero-navy">Đăng nhập</h1>
        <p className="mt-2 text-sm text-gray-600">Đăng nhập để quản lý tin tức AI57.</p>

        {!configured && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Chưa cấu hình biến môi trường Supabase.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-0 bg-[#f9f8f3] px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-primary/25"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-0 bg-[#f9f8f3] px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-primary/25"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !configured}
            className="w-full rounded-lg bg-primary-dark px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Đang đăng nhập…' : 'Đăng nhập'}
          </button>
        </form>

        <Link to="/tin-tuc" className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">
          ← Về trang tin tức
        </Link>
      </div>
    </div>
  )
}
