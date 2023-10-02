import { FC, useState } from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { ROUTE } from '@/utils/routes';

export const AsideActions: FC = () => {
  const [dropdown, setDropDown] = useState<boolean>(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setDropDown((prev) => !prev)}
        classNameModificator="bg-mainBlue text-white hover:bg-blueHover hover:border-blueBorderHover focus:bg-blueHover focus:border-blueBorderHover focus:shadow-[0px_0px_0px_0.2rem_rgba(38,143,255,0.5)] after:inline-block after:align-[1px] after:ml-2 after:w-2 after:h-2 after:border-t-[0.3em] after:border-r-[0.3em] after:border-r-transparent after:border-b-0 after:border-l-[0.3em] after:border-l-transparent"
      >
        Add New
      </Button>
      {dropdown ? (
        <div className="p-2 absolute top-[105%] left-0 bg-white border border-grayStroke-60 min-w-[10rem] rounded-lg text-left">
          <Link
            href={ROUTE.ADD_NEW_TASK}
            onClick={() => setDropDown(false)}
            className="block w-full cursor-pointer hover:bg-grayStroke-30 py-1 px-3.5 whitespace-nowrap bg-transparent font-medium rounded-md text-s14 text-mainBLue"
          >
            Add New Task
          </Link>
          {/* <Link
            href={ROUTE.ADD_NEW_FILE}
            onClick={() => setDropDown(false)}
            className="block w-full cursor-pointer hover:bg-grayStroke-30 py-1 px-3.5 whitespace-nowrap bg-transparent font-medium rounded-md text-s14 text-mainBLue"
          >
            Add New File
          </Link> */}
        </div>
      ) : null}
    </div>
  );
};
