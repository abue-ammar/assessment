import { CanvasActions } from "./canvas-actions";

export function CanvasHeader() {
  return (
    <div className="mb-4 flex h-6 items-center justify-between md:mb-6">
      <h1 className="text-white">Testing Canvas</h1>
      <CanvasActions />
    </div>
  );
}
