import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthBackground from './components/AuthBackground';
import AuthFooter from './components/AuthFooter';

const initialErrors = {
  fullName: false,
  email: false,
  phone: false,
  password: false,
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
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
      fullName: !fullName.trim(),
      email: !email.includes('@'),
      phone: !phone.trim(),
      password: password.length < 8,
    };

    setErrors(nextErrors);
    setApiError(null);

    if (Object.values(nextErrors).some(Boolean) || !termsAccepted) {
      if (!termsAccepted) {
        alert('Vui lòng đồng ý với Điều khoản và Chính sách');
      }
      return;
    }

    setSubmitting(true);

    try {
      await register({ fullName, email, password, phone: phone || undefined });
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Đăng ký thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md flex flex-col">
      <AuthBackground />
      <header className="fixed top-0 w-full bg-surface/80 backdrop-blur-xl z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md font-bold tracking-tight text-primary">LUXE APPLIANCE</div>
          <a className="text-secondary hover:text-primary transition-colors font-label-md text-label-md" href="#">
            Support
          </a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-stack-lg px-margin-mobile">
        <div className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl p-stack-lg md:p-12 border border-surface-variant/50 shadow-[0_4px_20px_rgba(31,41,55,0.04)] focus-within:shadow-[0_12px_30px_rgba(31,41,55,0.08)] transition-all duration-300">
          <div className="text-center mb-stack-lg">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Tạo tài khoản</h1>
            <p className="font-body-md text-body-md text-secondary">Khám phá không gian sống hiện đại cùng Luxe Appliance</p>
          </div>

          <form className="space-y-gutter" onSubmit={handleSubmit} noValidate>
            <div className="space-y-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="fullName">
                Họ và tên
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors">
                  person
                </span>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg transition-all font-body-md text-body-md outline-none"
                />
              </div>
              {errors.fullName && <p className="text-error text-label-sm font-label-sm">Vui lòng nhập họ và tên của bạn</p>}
            </div>

            <div className="space-y-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="email">
                Email
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg transition-all font-body-md text-body-md outline-none"
                />
              </div>
              {errors.email && <p className="text-error text-label-sm font-label-sm">Email không hợp lệ</p>}
            </div>

            <div className="space-y-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="phone">
                Số điện thoại
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors">
                  call
                </span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901 234 567"
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg transition-all font-body-md text-body-md outline-none"
                />
              </div>
              {errors.phone && <p className="text-error text-label-sm font-label-sm">Số điện thoại không hợp lệ</p>}
            </div>

            <div className="space-y-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="password">
                Mật khẩu
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg transition-all font-body-md text-body-md outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>

              <div className="flex gap-1 h-1 w-full mt-1" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span
                    key={index}
                    className={`strength-bar flex-1 rounded-full transition-all ${
                      strength > index
                        ? strength <= 1
                          ? 'bg-error'
                          : strength <= 3
                          ? 'bg-primary-fixed-dim'
                          : 'bg-tertiary-container'
                        : 'bg-surface-variant'
                    }`}
                  />
                ))}
              </div>
              {errors.password && <p className="text-error text-label-sm font-label-sm">Mật khẩu cần ít nhất 8 ký tự</p>}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
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
                của Luxe Appliance.
              </label>
            </div>

            {apiError && <p className="text-error font-body-sm text-body-sm">{apiError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg active:scale-[0.98] transition-transform duration-200 shadow-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
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
        </div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default RegisterPage;
