import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

    if (Object.values(nextErrors).some(Boolean) || !termsAccepted) {
      return;
    }

    setSubmitting(true);

    try {
      await register({ fullName, email, password, phone: phone || undefined });
      toast.success('Đăng ký thành công!');
      navigate('/login', { state: { justRegistered: true } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Đăng ký thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body-md flex flex-col">
      <AuthBackground />
      <main className="flex-grow flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[480px] animate-auth-in">
          <div className="text-center mb-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white shadow-lg mb-4 transition-colors hover:bg-primary/90"
              aria-label="Về trang chủ"
            >
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">HomeApplianceStore</h1>
            <p className="text-sm text-slate-500">Khám phá không gian sống hiện đại cùng HomeApplianceStore</p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
            <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">Tạo tài khoản</h2>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
                          className={`flex-1 rounded-full transition-all ${strength > index ? strengthMeta[strength].color : 'bg-surface-variant'
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
                    className="mt-0.5 w-4 h-4 text-primary border-slate-300 rounded cursor-pointer focus:ring-primary focus:ring-offset-0 transition-colors"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                    Tôi đồng ý với{' '}
                    <a className="font-medium text-primary hover:text-primary/80 transition-colors" href="#">
                      Điều khoản dịch vụ
                    </a>{' '}
                    và{' '}
                    <a className="font-medium text-primary hover:text-primary/80 transition-colors" href="#">
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

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-primary text-white font-medium rounded-xl transition-colors duration-200 shadow-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting && (
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                )}
                {submitting ? 'Đang xử lý...' : 'Đăng ký'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Đã có tài khoản?
                <Link className="font-medium text-primary hover:text-primary/80 transition-colors ml-1.5" to="/login">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
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
