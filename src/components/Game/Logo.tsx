export interface LogoProps {
  winNumber: number;
}

export const Logo = ({ winNumber }: LogoProps) => {
  return (
    <h1 className='Game_logo'>
      <span className='prefix'>Connect </span>
      <span className='winNumber'>{winNumber}</span>
    </h1>
  );
};
