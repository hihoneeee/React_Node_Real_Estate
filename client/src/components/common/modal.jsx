import { useAppStore } from "src/store/useAppStore";

const Modal = () => {
  const { contentModal, setModal } = useAppStore();
  return (
    <div
      onClick={() => setModal(false, null)}
      className="absolute top-0 left-0 w-screen h-screen bg-overlay-50 z-50 flex items-center justify-center"
    >
      {contentModal}
    </div>
  );
};

export default Modal;
