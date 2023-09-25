import { ContentBox } from '@/components/clients/ContentBox';
import { ContentItem } from '@/components/clients/ContentItem';
import { FC, useState } from 'react';

const Clients: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className={'pt-5 pb-10'}>
      <div className="max-w-container mx-auto w-full px-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-md26 font-medium text-black mr-3">Clients</h1>
            <button
              type="button"
              onClick={openModal}
              className="w-8 h-8 rounded-full bg-grayBg text-grayMedium hover:bg-addBtnHover flex items-center justify-center"
            >
              <img src="/icons/plus-icon.svg" alt="add" className="w-4 h-4" />
            </button>
          </div>
          <div className="text-black bg-white p-2 border rounded-full">
            <p className="text-s14 text-grayStroke-70">Filter tasks</p>
          </div>
        </div>
        <ContentBox title="Evaluation">
          <ContentItem
            name="John Smith"
            email="mamail@gmai.com"
            doneTasks={2}
            allTasks={10}
          ></ContentItem>
          <ContentItem
            name="Emma White"
            email="enmamail@gmai.com"
            doneTasks={3}
            allTasks={6}
          ></ContentItem>
        </ContentBox>
      </div>
    </section>
  );
};

export default Clients;
