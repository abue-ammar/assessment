export function DragIndicator() {
  return (
    <div className="pointer-events-none absolute top-[100px] left-20 z-50 flex scale-75 items-center gap-0 md:top-[94px] md:left-52 md:scale-100">
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
        <span className="hidden text-white md:inline">
          Drag items from here
        </span>
        <span className="text-sm text-white md:hidden">
          Press and hold and drag
        </span>
      </div>
    </div>
  );
}
