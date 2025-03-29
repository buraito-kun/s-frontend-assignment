import { Dispatch, SetStateAction } from "react";

type Props = {
  setQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ setQuery }: Props) {
  return (
    <div className="w-full h-14 flex place-content-center place-items-center">
      <input
        type="text"
        className="w-1/2 h-10 rounded-full px-5 bg-gray-500"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
