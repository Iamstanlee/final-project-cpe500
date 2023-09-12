import SvgIcon from './svg-icon';

interface Props {
  className?: String;
}

const LoadingIndicator = ({ className }: Props) => {
  return (
    <div className={`h-full w-full flex justify-center items-center ${className}`}>
      <SvgIcon name="rotate" />
    </div>
  );
};

export default LoadingIndicator;
