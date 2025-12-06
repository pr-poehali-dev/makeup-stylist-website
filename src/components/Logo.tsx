export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="currentColor" fillOpacity="0.1" />
      <text
        x="50"
        y="50"
        dominantBaseline="central"
        textAnchor="middle"
        fill="currentColor"
        fontSize="36"
        fontFamily="Cormorant, serif"
        fontWeight="600"
      >
        ЕС
      </text>
    </svg>
  );
}
