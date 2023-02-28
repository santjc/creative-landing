type Props = {
  size?: string;
};

export default function MenuIcon({ size = '16px' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
    >
      <path
        d="M1 8 C6 8 11 8 16 8 16 8.66 16 9.33 16 10 11 10 6 10 1 10 1 9.33 1 8.66 1 8 "
        fill="currentColor"
        data-svg-origin="13 9"
        data-original="M1 8h15v2H1z"
      ></path>
      <line
        x1="1"
        y1="15"
        x2="25"
        y2="15"
        stroke="currentColor"
        stroke-width="2"
        data-svg-origin="13 15"
        transform="matrix(1,0,0,1,0,0)"
      ></line>
      <path
        d="M1 20h24v2H1z"
        fill="currentColor"
        data-svg-origin="13 21"
        transform="matrix(1,0,0,1,0,0)"
      ></path>
    </svg>
  );
}
