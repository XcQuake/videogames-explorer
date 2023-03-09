import './Placeholder.scss';

interface Props {
  height?: string;
  styles?: {
    [key: string]: string;
  };
}

type CompoundedComponent = React.ForwardRefExoticComponent<Props> & {
  Card: () => JSX.Element;
  GamePage: () => JSX.Element;
  Rect: ({ height, styles }: Props) => JSX.Element;
  Circle: ({ height, styles }: Props) => JSX.Element;
};

const InternalPlaceholder: React.FC<Props> = (props) => {
  return <div className="placeholder" />;
};

const Placeholder = InternalPlaceholder as CompoundedComponent;

Placeholder.Rect = (props: Props) => (
  <div
    className="placeholder-rect"
    style={{ height: props.height, ...props.styles }}
  />
);

Placeholder.Circle = (props: Props) => (
  <div
    className="placeholder-circle"
    style={{ height: props.height, ...props.styles }}
  />
);

Placeholder.Card = () => {
  return (
    <div className="placeholder-card">
      <Placeholder.Rect
        height="230px"
        styles={{ borderRadius: '10px 10px 0 0' }}
      />
      <div className="placeholder-card__description">
        <Placeholder.Rect height="25px" />
        <div className="placeholder-card__about">
          <div className="placeholder-card__platforms">
            <Placeholder.Rect height="25px" />
            <Placeholder.Circle height="25px" />
            <Placeholder.Circle height="25px" />
          </div>
          <Placeholder.Rect height="20px" />
        </div>
      </div>
    </div>
  );
};

Placeholder.GamePage = () => {
  return (
    <div className="placeholder-gamepage">
      <Placeholder.Rect height="30px" />
      <Placeholder.Rect height="80px" />
      <Placeholder.Rect height="250px" />
    </div>
  );
};

export default Placeholder;
