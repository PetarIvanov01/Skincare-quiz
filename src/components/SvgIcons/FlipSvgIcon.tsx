type Props = Readonly<React.SVGProps<SVGSVGElement>>;

export default function FlipSvgIcon(props: Props) {
  return (
    <svg
      {...props}
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0769 19C13.5389 19 14.9634 18.532 16.1462 17.6631C17.329 16.7942 18.2094 15.569 18.6612 14.1631C19.1129 12.7572 19.1129 11.2428 18.6612 9.83688C18.2094 8.43098 17.329 7.20578 16.1462 6.33688C14.9634 5.46798 13.5389 5 12.0769 5C10.6149 5 9.19043 5.46799 8.00764 6.33688C6.82485 7.20578 5.94447 8.43098 5.49268 9.83688C5.0409 11.2428 5.0409 12.7572 5.49269 14.1631M6.5 12.7778L5.53846 14.3333L4 13.1667"
        stroke="#464455"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1px"
      />
    </svg>
  );
}
