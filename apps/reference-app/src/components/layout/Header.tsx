export default function Header() {
  return (
    <header className="bg-ohdsi-blue text-white px-6 py-3 flex items-center gap-4 shadow-md">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-ohdsi-orange rounded-full flex items-center justify-center font-bold text-sm">W</div>
        <span className="font-semibold text-lg">OHDSI WebAPI Reference App</span>
      </div>
      <div className="ml-auto text-sm text-blue-200">WebAPI WG Symposium 2026</div>
    </header>
  );
}
