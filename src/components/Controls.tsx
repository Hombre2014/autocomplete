import User from './User';

interface ControlsProps {
  input: string;
  selected: boolean;
  getInfo: (event: React.MouseEvent<HTMLButtonElement>) => User | undefined;
  clearFields: () => void;
}

const Controls = ({ input, selected, getInfo, clearFields }: ControlsProps) => {
  return (
    <div className="flex gap-x-4 mt-4 justify-center">
      <button
        disabled={!selected}
        className="bg-blue-500 text-white py-2 px-4 rounded-md ml-4 disabled:bg-gray-400"
        type="submit"
        onClick={getInfo}
      >
        Get info
      </button>
      <button
        disabled={!input}
        className="bg-red-500 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
        type="submit"
        onClick={clearFields}
      >
        Clear Form
      </button>
    </div>
  );
};

export default Controls;
