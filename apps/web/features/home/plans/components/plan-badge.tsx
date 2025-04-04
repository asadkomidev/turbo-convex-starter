interface Props {
  isPopular: boolean;
}

export const PlanBadge = ({ isPopular }: Props) => {
  if (!isPopular) return null;

  return (
    <span className="absolute -top-3.5 left-0 right-0 mx-auto w-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-2 py-1 text-sm font-medium text-white text-center">
      Popular
    </span>
  );
};
