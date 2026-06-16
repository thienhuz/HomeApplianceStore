import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthBackground from './components/AuthBackground';
import AuthFooter from './components/AuthFooter';
import AuthField from './components/AuthField';
import SocialLoginButton from './components/SocialLoginButton';

const initialErrors = {
  email: '',
  password: '',
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const justRegistered = (location.state as { justRegistered?: boolean } | null)?.justRegistered ?? false;

  const submitDisabled = useMemo(
    () => submitting || !email || !password,
    [email, password, submitting]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      email: !email.includes('@') ? 'Vui lòng nhập email hợp lệ.' : '',
      password: password.length < 8 ? 'Mật khẩu phải có ít nhất 8 ký tự.' : '',
    };

    setErrors(nextErrors);
    setApiError(null);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setSubmitting(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Đăng nhập thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md flex flex-col">
      <AuthBackground />
      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-lg relative overflow-hidden">
        <div className="w-full max-w-md z-10 animate-auth-in">
          <div className="text-center mb-stack-lg">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-on-primary shadow-md mb-3 transition-transform hover:scale-105 active:scale-95"
              aria-label="Về trang chủ"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            </Link>
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mb-2">HomeApplianceStore</h1>
            <p className="font-body-md text-body-md text-secondary">Nâng tầm không gian sống của bạn</p>
          </div>

          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-surface-variant/50 shadow-[0_4px_20px_rgba(31,41,55,0.04)] hover:shadow-[0_12px_30px_rgba(31,41,55,0.08)] transition-all duration-300">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-lg text-center">Đăng nhập</h2>

            {justRegistered && (
              <div className="flex items-center gap-2 mb-stack-lg p-3 rounded-lg bg-tertiary-container/15 text-tertiary font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <AuthField
                id="loginEmail"
                label="Email"
                icon="mail"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="example@email.com"
                autoComplete="email"
                error={errors.email}
              />

              <AuthField
                id="loginPassword"
                label="Mật khẩu"
                icon="lock"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                autoComplete="current-password"
                error={errors.password}
                labelAction={
                  <Link className="font-label-sm text-label-sm text-primary hover:underline transition-all" to="#">
                    Quên mật khẩu?
                  </Link>
                }
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors p-1"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                }
              />

              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary"
                />
                <label htmlFor="remember" className="ml-2 font-body-sm text-body-sm text-secondary cursor-pointer select-none">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              {apiError && (
                <p className="flex items-center gap-1 text-error font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitDisabled}
                className="w-full bg-primary-container text-on-primary font-label-md text-label-md py-4 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting && (
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                )}
                {submitting ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-variant"></div>
              </div>
              <div className="relative flex justify-center text-label-sm font-label-sm">
                <span className="px-4 bg-surface-container-lowest text-secondary">Hoặc đăng nhập với</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SocialLoginButton
                label="Google"
                icon={<img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWaOnmGGRxmBa5-t8YF65eu_IKAhmrR2DUHDP4ROIfxj2b5NRZ8BGaPNHMoHqlSEn3gEgICGkgZGvqXox_uAKWo0n_gYx-NAzSHr2ySvsFdihIDjaHLG0kUAfBz0Zq1KMj2e7vFv5H041AttbagZJHhw61p2HtSF15U03QMEp3Q7YfswkDd4Ffr6-iTEmjIDq5TXMPtMGyjZ7cN3jxPLG-ou-2U1EiYLbeVsVCBD-eLxVnRGpq6g6xIsq7P8mgRExMArSGg5xbAA" />}
              />
              <SocialLoginButton
                label="Facebook"
                icon={
                  <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                }
              />
            </div>

            <p className="mt-8 text-center font-body-sm text-body-sm text-secondary">
              Chưa có tài khoản?
              <Link className="text-primary font-bold hover:underline transition-all ml-1" to="/register">
                Đăng ký ngay
              </Link>
            </p>

            <div className="mt-6 pt-6 border-t border-surface-variant/50 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
};

export default LoginPage;
