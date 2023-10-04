import { FC, ReactNode } from 'react';

type AddFormLayoutProps = {
  children: ReactNode;
};

export const AddFormLayout: FC<AddFormLayoutProps> = ({ children }) => {
  return (
    <section className="py-5 max-w-7xl mx-auto">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md">
        {children}
      </div>
    </section>
  );
};
