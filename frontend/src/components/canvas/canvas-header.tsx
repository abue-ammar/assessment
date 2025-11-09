import { CanvasActions } from "./canvas-actions";

export function CanvasHeader() {
  return (
    <div className="mb-6 flex h-6 items-center justify-between">
      <h1 className="text-white">Testing Canvas</h1>
      <CanvasActions />
    </div>
  );
}
