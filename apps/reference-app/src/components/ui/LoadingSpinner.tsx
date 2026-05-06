export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12 gap-3 text-gray-500">
      <div className="w-5 h-5 border-2 border-ohdsi-blue border-t-transparent rounded-full animate-spin" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
