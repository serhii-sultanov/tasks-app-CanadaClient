import { FC, ReactNode } from 'react';

type AddFormLayoutProps = {
  children: ReactNode;
};

export const AddFormLayout: FC<AddFormLayoutProps> = ({ children }) => {
  return (
    <section className="pb-12 pt-5 px-5 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto mb-5">{children}</div>
    </section>
  );
};
