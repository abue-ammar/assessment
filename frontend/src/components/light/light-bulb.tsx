interface LightBulbProps {
  power: boolean;
  glowIntensity: number;
  bulbColor: string;
}

export function LightBulb({ power, glowIntensity, bulbColor }: LightBulbProps) {
  return (
    <div
      className="relative scale-75 md:scale-100"
      style={{ width: "128px", height: "196px" }}
    >
      {/* Bulb Cap */}
      <div
        className="absolute rounded-t-md"
        style={{
          width: "64px",
          height: "12px",
          left: "32px",
          top: "0px",
          background: "linear-gradient(180deg, #4A5565 0%, #364153 100%)",
        }}
      />

      {/* Thread lines */}
      <div
        className="absolute flex flex-col"
        style={{
          width: "80px",
          height: "16px",
          left: "24px",
          top: "12px",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: "80px",
              height: "4px",
              background: "#364153",
              borderBottom: "1px solid #4A5565",
            }}
          />
        ))}
      </div>

      {/* Bulb container */}
      <div
        className="absolute"
        style={{
          width: "128px",
          height: "160px",
          left: "0px",
          top: "36px",
        }}
      >
        {/* Max brightness outer glow */}
        {power && glowIntensity > 0.5 && (
          <div
            className="absolute rounded-full transition-opacity duration-300"
            style={{
              width: "384px",
              height: "384px",
              left: "-128px",
              top: "-94px",
              background: bulbColor,
              opacity: Math.pow(glowIntensity, 1.5) * 0.21,
              filter: "blur(64px)",
            }}
          />
        )}

        {/* Medium glow */}
        {power && (
          <div
            className="absolute rounded-full transition-opacity duration-300"
            style={{
              width: "192px",
              height: "240px",
              left: "-32px",
              top: "-40px",
              background: bulbColor,
              opacity: Math.pow(glowIntensity, 1.2) * 0.35,
              filter: "blur(24px)",
            }}
          />
        )}

        {/* Main bulb body */}
        <div
          className="absolute rounded-full transition-all duration-300"
          style={{
            width: "128px",
            height: "160px",
            left: "0px",
            top: "0px",
            background: power
              ? `radial-gradient(112.05% 89.64% at 30% 30%, ${bulbColor} 0%, ${bulbColor}dd 50%, ${bulbColor}99 100%)`
              : "radial-gradient(112.05% 89.64% at 30% 30%, #4A5568 0%, #2D3748 50%, #1A202C 100%)",
            boxShadow: power
              ? `0px 0px ${20 + glowIntensity * 40}px ${bulbColor}99, inset 0px 0px 20px ${bulbColor}66`
              : "inset 0px 0px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Glass reflection effect */}
          <div
            className="absolute rounded-full"
            style={{
              width: "48px",
              height: "64px",
              left: "32px",
              top: "32px",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
              opacity: 0.4,
              filter: "blur(8px)",
            }}
          />

          {/* Filament */}
          {power && (
            <div
              className="absolute rounded-full transition-all duration-300"
              style={{
                width: "4px",
                height: "64px",
                left: "62px",
                top: "48px",
                background: `linear-gradient(180deg, ${bulbColor} 0%, #FFFFFF 100%)`,
                boxShadow: `0px 0px 10px ${bulbColor}`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
