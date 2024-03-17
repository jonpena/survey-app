type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-screen mx-auto bg-[#F0F9FF]">{children}</div>
  );
};

export default Layout;
