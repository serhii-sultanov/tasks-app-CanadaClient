// import { FC, useState } from 'react';

// type DotsButtonProps = {
//   children: React.ReactNode;
// };

// export const DotsButton: FC<DotsButtonProps> = ({ children }) => {
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div
//       onClick={toggleMenu}
//       className="hover:bg-addBtnHover cursor-pointer rounded-full min-w-[32px] min-h-[32px] flex items-center justify-center relative "
//     >
//       <img src="/icons/dots-vertical-icon.svg" alt="dots" className="w-6 h-6" />
//       {isMenuOpen && (
//         <div className="absolute rounded-xl top-10 right-0 bg-white p-2 shadow-md z-10">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

import { FC, useState, useRef, useEffect } from 'react';

type DotsButtonProps = {
  children: React.ReactNode;
};

export const DotsButton: FC<DotsButtonProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const timerRef = useRef<NodeJS.Timeout | null | undefined>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleButtonClick = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    toggleMenu();
  };

  const handleBlur = () => {
    timerRef.current = setTimeout(() => {
      closeMenu();
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      onClick={handleButtonClick}
      onBlur={handleBlur}
      tabIndex={0}
      className="hover:bg-addBtnHover cursor-pointer rounded-full min-w-[32px] min-h-[32px] flex items-center justify-center relative "
    >
      <img src="/icons/dots-vertical-icon.svg" alt="dots" className="w-6 h-6" />
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute rounded-xl top-10 right-0 bg-white p-2 shadow-md z-10"
        >
          {children}
        </div>
      )}
    </div>
  );
};
