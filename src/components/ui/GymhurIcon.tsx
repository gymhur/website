interface GymhurIconProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: number;
}

export default function GymhurIcon({
  variant = 'light',
  className,
  size = 40,
}: GymhurIconProps) {
  const fill = variant === 'light' ? '#FFFFFF' : '#213541';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="430 480 370 340"
      width={size}
      height={size}
      aria-label="Gymhur"
      role="img"
      data-variant={variant}
      className={className}
    >
      <path
        fill={fill}
        d="M590.3,591.9c0.8-18.3,13.6-33.6,31.1-37.3l21.7-5.4l35.7-65.2l21.4-39l-215.6,38.2l58.2,105.4
          l-78.7,143.7l99.3-24.1c13.6-3.3,22.8-15.5,23.3-29.5c0-0.1,0-0.2,0-0.3L590.3,591.9z"
      />
      <path
        fill={fill}
        d="M689.7,688.1c-0.8,18.3-13.6,33.6-31.1,37.3l-21.7,5.4l-35.7,65.2l-21.4,39l215.6-38.2l-58.2-105.4
          l78.7-143.7l-99.3,24.1c-13.6,3.3-22.8,15.5-23.3,29.5c0,0.1,0,0.2,0,0.3L689.7,688.1z"
      />
    </svg>
  );
}
