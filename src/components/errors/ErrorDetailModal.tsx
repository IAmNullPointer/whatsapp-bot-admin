"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";

type Props = {
  errorId: number | null;
  onClose: () => void;
};

type ErrorDetail = {
  id: number;
  bot_id: string;
  service_name: string;
  error_type: string;
  message: string;
  raw_payload: any;
  created_at: string;
};

export default function ErrorDetailModal({ errorId, onClose }: Props) {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState<ErrorDetail | null>(null);

  useEffect(() => {
    if (!errorId) return;
    openModal();

    async function fetchError() {
      try {
        const res = await api.get<ErrorDetail>(`/errors/${errorId}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to load error detail", err);
      }
    }

    fetchError();
  }, [errorId, openModal]);

  const handleClose = () => {
    closeModal();
    onClose();
  };

  if (!errorId || !data) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-2xl p-6 lg:p-8"
      showCloseButton
    >
      <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
        Error #{data.id} — {data.service_name}
      </h4>

      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
        <div>
          <strong>Type:</strong> {data.error_type}
        </div>
        <div>
          <strong>Message:</strong> {data.message}
        </div>
        <div>
          <strong>Bot ID:</strong> {data.bot_id}
        </div>
        <div>
          <strong>Created:</strong> {new Date(data.created_at).toLocaleString()}
        </div>
        <div>
          <strong>Payload:</strong>
          <pre className="mt-1 max-h-64 overflow-auto rounded-md bg-gray-100 dark:bg-gray-800 text-xs p-3 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
            {JSON.stringify(data.raw_payload, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-6 text-right">
        <Button size="sm" variant="outline" onClick={handleClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
