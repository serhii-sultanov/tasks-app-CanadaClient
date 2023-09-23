import { FC, useState } from 'react';

type DotsButtonProps = {
  children: React.ReactNode;
};

export const DotsButton: FC<DotsButtonProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <button
      type="button"
      onClick={toggleMenu}
      className="hover:bg-addBtnHover rounded-full w-8 h-8 flex items-center justify-center relative"
    >
      <img src="/icons/dots-vertical-icon.svg" alt="dots" className="w-6 h-6" />
      {isMenuOpen && (
        <div className="absolute rounded-xl top-10 right-0 bg-white p-2 shadow-sm">
          {children}
        </div>
      )}
    </button>
  );
};
