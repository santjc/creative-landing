type Props = {
  size?: string;
};

export default function LinkedInIcon({ size = '48px' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <path
        fill="#0078d4"
        d="M8.421 14h.052C11.263 14 13 12 13 9.5 12.948 6.945 11.263 5 8.526 5S4 6.945 4 9.5C4 12 5.736 14 8.421 14zM4 17h9v26H4V17zm40 9.5a9.5 9.5 0 0 0-9.5-9.5 9.474 9.474 0 0 0-7.5 3.684V17h-9v26h9V28a4 4 0 0 1 8 0v15h9V26.5z"
      />
    </svg>
  );
}
