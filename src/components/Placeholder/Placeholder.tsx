import Skeleton from 'react-loading-skeleton';
import './Placeholder.scss';

interface Props {
  children: React.ReactNode;
}

type CompoundedComponent = React.ForwardRefExoticComponent<Props> & {
  Card: () => JSX.Element;
};

const InternalPlaceholder: React.FC<Props> = ({ children }) => {
  return <div className="placeholder">{children}</div>;
};

const Placeholder = InternalPlaceholder as CompoundedComponent;

Placeholder.Card = () => {
  return (
    <div className="placeholder-card">
      <div className="placeholder-card__poster" />
      <div className="placeholder-card__description">
        <div className="placeholder-card__title" />
        <div className="placeholder-card__about">
          <div className="placeholder-card__platforms">
            <div className="placeholder-card__platform" />
            <div className="placeholder-card__platform" />
            <div className="placeholder-card__platform" />
          </div>
          <div className="placeholder-card__release" />
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
