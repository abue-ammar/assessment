interface ColorTemp {
  id: string;
  label: string;
  color: string;
}

interface ColorTemperatureProps {
  colorTemps: ColorTemp[];
  selectedColorTemp: string;
  onColorTempChange: (tempId: string) => void;
  power: boolean;
}

export function ColorTemperature({
  colorTemps,
  selectedColorTemp,
  onColorTempChange,
  power,
}: ColorTemperatureProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 font-medium text-white">Color Temperature</h3>
      <div className="grid grid-cols-4 gap-3">
        {colorTemps.map((temp) => (
          <button
            key={temp.id}
            onClick={() => onColorTempChange(temp.id)}
            className={`h-12 cursor-pointer rounded-lg border-2 transition-all ${
              selectedColorTemp === temp.id
                ? "border-blue-500 shadow-[0_0_0_2px_rgba(43,127,255,0.5)]"
                : "border-[#4A5565]"
            }`}
            style={{
              backgroundColor: temp.color,
              opacity: power ? 1 : 0.4,
            }}
            title={temp.label}
          ></button>
        ))}
      </div>
    </div>
  );
}
