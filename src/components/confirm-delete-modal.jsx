import { Dialog } from "@headlessui/react";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow space-y-4">
          <Dialog.Title className="text-lg font-bold text-red-600">
            Confirmar exclusão
          </Dialog.Title>
          <p className="text-sm text-gray-700">
            Tem certeza que deseja deletar este evento? Esta ação não poderá ser
            desfeita.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Deletar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
