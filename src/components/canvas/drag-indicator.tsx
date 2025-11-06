export function DragIndicator() {
  return (
    <div className="pointer-events-none absolute top-[94px] left-52 z-50 flex items-center gap-0">
      <svg
        width="19"
        height="22"
        viewBox="0 0 19 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-none"
      >
        <path d="M0 11L18 0.607697L18 21.3923L0 11Z" fill="#2175D7" />
      </svg>
      <div className="-ml-1 flex h-[72px] w-[227px] items-center rounded-lg bg-blue-500 px-6 py-6">
        <span className="text-white">Drag items from here</span>
      </div>
    </div>
  );
}
