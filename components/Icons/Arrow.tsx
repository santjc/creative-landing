type Props = {
  size?: string;
};

export default function Arrow({ size = '16px' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentFill"
      viewBox="0 0 330 330"
    >
      <path d="M216.358 271.76a15.001 15.001 0 0 0-13.858-9.26H180V15c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15v247.5h-22.5a15 15 0 0 0-10.606 25.607l37.5 37.5C157.322 328.536 161.161 330 165 330s7.678-1.464 10.607-4.394l37.5-37.5a15 15 0 0 0 3.251-16.346z" />
    </svg>
  );
}
