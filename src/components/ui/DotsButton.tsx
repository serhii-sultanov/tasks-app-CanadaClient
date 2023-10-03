import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from './Loader';
import clsx from 'clsx';

type DotsButtonProps = {
  setEdit: () => void;
  taskListId?: string;
  userId?: string;
};

export const DotsButton: FC<DotsButtonProps> = ({
  setEdit,
  taskListId,
  userId,
}) => {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      const session = await getSession();
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/taskList/${userId}/${taskListId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      router.replace(router.asPath);
      setIsLoading(false);
      setConfirmDelete(false);
      setMenuOpen(false);
      toast.success(response.data.message);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setMenuOpen((prev) => !prev);
          setConfirmDelete(false);
        }}
        className="hover:bg-addBtnHover cursor-pointer rounded-full min-w-xsMinWidth min-h-xsMinHeght flex items-center justify-center relative"
      >
        <img
          src="/icons/dots-vertical-icon.svg"
          alt="dots"
          className="w-6 h-6"
        />
      </button>
      {isMenuOpen && (
        <div className="absolute rounded-md top-9 right-0 bg-white p-2 shadow-md z-10 min-w-[60px]">
          <button
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setEdit();
            }}
            className="text-mainBLue text-s14 block w-full text-right px-4 rounded-sm py-1 hover:bg-grayStroke-30"
          >
            Edit
          </button>
          <button
            onClick={() => setConfirmDelete((prev) => !prev)}
            className="text-mainRed text-s14 block w-full text-right px-4 rounded-sm py-1 hover:bg-grayStroke-30"
          >
            Delete
          </button>
          {confirmDelete ? (
            <div
              className={clsx(
                'flex justify-center items-center gap-1 my-1 rounded-sm',
                isLoading ? 'bg-mainRed' : '',
              )}
            >
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <button
                    className="text-green-600 bg-grayStroke-30 flex-1 rounded-sm flex items-center justify-center p-1 hover:bg-mainGreen hover:bg-opacity-20 transition-all duration-200 border border-grayStroke-70"
                    onClick={handleDelete}
                  >
                    <img
                      className="w-4 h-4"
                      src="/icons/accept-icon.svg"
                      alt="accept"
                    />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="text-red-500 bg-grayStroke-30 flex-1 rounded-sm flex items-center justify-center p-1 hover:bg-mainRed hover:bg-opacity-20 transition-all duration-200 border border-grayStroke-70"
                  >
                    <img
                      className="w-4 h-4"
                      src="/icons/cancel-icon.svg"
                      alt="cancel"
                    />
                  </button>
                </>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
