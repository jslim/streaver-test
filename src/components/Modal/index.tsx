import Button from '@/components/Button';
import { memo, useEffect } from 'react';

interface ModalProps {
  title?: string;
  description?: string;
  handleDelete?: () => void;
  handleCancel?: () => void;
  errorMessage?: string | null;
  isLoading?: boolean;
}

function Modal({
  title = "Delete Post",
  description = "Are you sure you want to delete the post? This action cannot be undone.",
  handleCancel,
  handleDelete,
  errorMessage,
  isLoading,
}: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      handleCancel?.(); // Close modal if the background is clicked
    }
  };

  useEffect(() => {
    // Close modal on ESC press
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCancel?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCancel]);

  return (
    <div
      className="absolute z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
        onClick={handleOverlayClick} // Close on overlay click
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          onClick={handleOverlayClick} // Close on overlay click
        >
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              </div>
              {errorMessage && (
                <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {/* Disable the delete button if loading */}
              <Button
                text={isLoading ? "Deleting..." : "Delete"}
                variant="danger"
                className="w-full sm:ml-3 sm:w-auto"
                onClick={handleDelete}
                disabled={isLoading}
              />
              <Button
                text="Cancel"
                variant="secondary"
                className="mt-3 w-full sm:mt-0 sm:w-auto"
                onClick={handleCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Modal);
