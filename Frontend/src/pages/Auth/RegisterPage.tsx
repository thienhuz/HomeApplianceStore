import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthBackground from './components/AuthBackground';
import AuthFooter from './components/AuthFooter';
import AuthField from './components/AuthField';

const initialErrors = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
};

const strengthMeta = [
  { label: 'Rất yếu', color: 'bg-error', text: 'text-error' },
  { label: 'Yếu', color: 'bg-error', text: 'text-error' },
  { label: 'Trung bình', color: 'bg-primary-fixed-dim', text: 'text-on-primary-fixed-variant' },
  { label: 'Khá', color: 'bg-primary-fixed-dim', text: 'text-on-primary-fixed-variant' },
  { label: 'Mạnh', color: 'bg-tertiary-container', text: 'text-tertiary' },
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const strength = useMemo(() => {
    let value = 0;
    if (password.length > 5) value++;
    if (password.length > 8) value++;
    if (/[A-Z]/.test(password)) value++;
    if (/[0-9]/.test(password)) value++;
    return value;
  }, [password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      fullName: !fullName.trim() ? 'Vui lòng nhập họ và tên của bạn' : '',
      email: !email.includes('@') ? 'Email không hợp lệ' : '',
      phone: !phone.trim() ? 'Số điện thoại không hợp lệ' : '',
      password: password.length < 8 ? 'Mật khẩu cần ít nhất 8 ký tự' : '',
    };

    setErrors(nextErrors);
    setTermsError(!termsAccepted);
    setApiError(null);

    if (Object.values(nextErrors).some(Boolean) || !termsAccepted) {
      return;
    }

    setSubmitting(true);

    try {
      await register({ fullName, email, password, phone: phone || undefined });
      navigate('/login', { state: { justRegistered: true } });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Đăng ký thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md flex flex-col">
      <AuthBackground />
      <main className="flex-grow flex items-center justify-center py-stack-lg px-margin-mobile">
        <div className="w-full max-w-[480px] animate-auth-in">
          <div className="text-center mb-stack-lg">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-on-primary shadow-md mb-3 transition-transform hover:scale-105 active:scale-95"
              aria-label="Về trang chủ"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            </Link>
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mb-2">HomeApplianceStore</h1>
            <p className="font-body-md text-body-md text-secondary">Khám phá không gian sống hiện đại cùng HomeApplianceStore</p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-stack-lg md:p-12 border border-surface-variant/50 shadow-[0_4px_20px_rgba(31,41,55,0.04)] focus-within:shadow-[0_12px_30px_rgba(31,41,55,0.08)] transition-all duration-300">
            <h2 className="font-headline-md text-headline-md text-on-surface text-center mb-stack-lg">Tạo tài khoản</h2>

          <form className="space-y-gutter" onSubmit={handleSubmit} noValidate>
            <AuthField
              id="fullName"
              label="Họ và tên"
              icon="person"
              value={fullName}
              onChange={setFullName}
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              error={errors.fullName}
            />

            <AuthField
              id="email"
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
              id="phone"
              label="Số điện thoại"
              icon="call"
              type="tel"
              value={phone}
              onChange={setPhone}
              placeholder="0901 234 567"
              autoComplete="tel"
              error={errors.phone}
            />

            <AuthField
              id="password"
              label="Mật khẩu"
              icon="lock"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.password}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              }
            >
              {password.length > 0 && (
                <div className="mt-1">
                  <div className="flex gap-1 h-1 w-full" aria-hidden="true">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span
                        key={index}
                        className={`flex-1 rounded-full transition-all ${
                          strength > index ? strengthMeta[strength].color : 'bg-surface-variant'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`mt-1 font-label-sm text-label-sm ${strengthMeta[strength].text}`}>
                    Độ mạnh: {strengthMeta[strength].label}
                  </p>
                </div>
              )}
            </AuthField>

            <div>
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                  className="mt-1 w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0"
                />
                <label htmlFor="terms" className="font-body-sm text-body-sm text-secondary">
                  Tôi đồng ý với{' '}
                  <a className="text-primary hover:underline" href="#">
                    Điều khoản dịch vụ
                  </a>{' '}
                  và{' '}
                  <a className="text-primary hover:underline" href="#">
                    Chính sách bảo mật
                  </a>{' '}
                  của HomeApplianceStore.
                </label>
              </div>
              {termsError && (
                <p className="flex items-center gap-1 text-error font-label-sm text-label-sm mt-1.5">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  Vui lòng đồng ý với Điều khoản và Chính sách
                </p>
              )}
            </div>

            {apiError && (
              <p className="flex items-center gap-1 text-error font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg active:scale-[0.98] transition-transform duration-200 shadow-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting && (
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              )}
              {submitting ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </form>

          <div className="mt-stack-lg text-center">
            <p className="font-body-sm text-body-sm text-secondary">
              Đã có tài khoản?
              <Link className="text-primary font-bold hover:underline ml-1" to="/login">
                Đăng nhập ngay
              </Link>
            </p>
          </div>

            <div className="mt-stack-md pt-stack-md border-t border-surface-variant/50 text-center">
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

export default RegisterPage;
