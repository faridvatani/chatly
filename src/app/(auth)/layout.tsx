const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4 bg-background">
    {children}
  </div>
);

export default AuthLayout;
