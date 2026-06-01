interface SuccessNotificationProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export default function SuccessNotification({
  title,
  message,
  onClose,
}: SuccessNotificationProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-leaf-200 bg-leaf-50 p-5 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-white">
          ✓
        </span>
        <div className="flex-1">
          <p className="font-semibold text-leaf-800">{title}</p>
          <p className="mt-1 text-sm text-leaf-700">{message}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-leaf-600 hover:text-leaf-800"
            aria-label="Tutup notifikasi"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
