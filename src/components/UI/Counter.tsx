type CounterProps = {
  time: string | number;
  label: string;
};

const Counter = ({ time, label }: CounterProps) => {
  return (
    <div>
      <span className="countdown mr-[2px]">
        <span
          style={
            {
              "--value": time,
            } as React.CSSProperties
          }
        ></span>
      </span>
      {label}
    </div>
  );
};

export default Counter;
