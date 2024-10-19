type Props = Readonly<
  {
    children: React.ReactNode;
    to: string;
    replace?: boolean;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>;

export default function Link(props: Props) {
  const { children, to, replace, onClick, ...rest } = props;

  const handleRedirect = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (onClick) {
      onClick(e);
    }

    e.preventDefault();

    if (replace) {
      history.replaceState({}, "", to);
    } else {
      history.pushState({}, "", to);
    }

    const NavigateEvent = new PopStateEvent("navigate", {});
    window.dispatchEvent(NavigateEvent);
  };

  return (
    <a {...rest} onClick={handleRedirect} href={to}>
      {children}
    </a>
  );
}
