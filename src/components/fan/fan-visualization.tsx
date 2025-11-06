interface FanVisualizationProps {
  power: boolean;
  speed: number;
  animationDuration: string;
}

export function FanVisualization({
  power,
  speed,
  animationDuration,
}: FanVisualizationProps) {
  const Wing = ({ rotation }: { rotation: number }) => (
    <div
      className="absolute"
      style={{
        width: "134px",
        height: "56px",
        left: "50%",
        top: "50%",
        transform: `translateY(-50%) rotate(${rotation}deg)`,
        transformOrigin: "0% 50%",
      }}
    >
      {/* Main wing body */}
      <div
        style={{
          position: "absolute",
          width: "134px",
          height: "56px",
          background:
            "linear-gradient(90deg, #4A5568 0%, #2D3748 30%, #1A202C 70%, #0F1419 100%)",
          boxShadow:
            "0px 2px 8px rgba(0, 0, 0, 0.3), inset 0px 2px 4px rgba(255, 255, 255, 0.1)",
          borderRadius: "0px 9999px 9999px 0px",
        }}
      />

      {/* Top highlight */}
      <div
        style={{
          position: "absolute",
          width: "134px",
          height: "56px",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0) 100%)",
          opacity: 0.2,
          borderRadius: "0px 9999px 9999px 0px",
        }}
      />

      {/* Center shadow */}
      <div
        style={{
          position: "absolute",
          width: "134px",
          height: "56px",
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #101828 50%, rgba(0, 0, 0, 0) 100%)",
          opacity: 0.1,
          borderRadius: "0px 9999px 9999px 0px",
        }}
      />
    </div>
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className={`relative ${power && speed > 0 ? "fan-spinning" : ""}`}
        style={{
          animationDuration: power ? animationDuration : "0s",
          width: "320px",
          height: "320px",
        }}
      >
        <Wing rotation={0} />
        <Wing rotation={90} />
        <Wing rotation={180} />
        <Wing rotation={270} />

        {/* Motor */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            width: "80px",
            height: "80px",
            left: "120px",
            top: "120px",
            background: "linear-gradient(135deg, #4A5565 0%, #1E2939 100%)",
            border: "4px solid #364153",
            boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
            borderRadius: "9999px",
          }}
        >
          {/* Inner motor circle */}
          <div
            style={{
              position: "absolute",
              width: "56px",
              height: "56px",
              left: "8px",
              top: "8px",
              background: "linear-gradient(135deg, #364153 0%, #101828 100%)",
              borderRadius: "9999px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
