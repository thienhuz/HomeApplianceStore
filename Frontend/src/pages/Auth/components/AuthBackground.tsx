import React from 'react';

const AuthBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
    <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-tertiary/5 blur-[100px]" />
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary rounded-full blur-3xl" />
    </div>
  </div>
);

export default AuthBackground;
