import User from './User';

interface InfoProps {
  input: string;
  info: string;
  suggestions: User[];
  personUsername: string;
  email: string;
  buttonClicked: boolean;
  gettingData: boolean;
}

const Info = ({
  input,
  info,
  suggestions,
  personUsername,
  email,
  buttonClicked,
  gettingData,
}: InfoProps) => {
  return (
    <section>
      {buttonClicked && (
        <div className="flex flex-col w-[280px] justify-center mt-8">
          <h2 className="font-semibold text-green-500 bg-green-500/15 p-2 rounded-md">
            Info for {input}
          </h2>
          <p className="mt-4 pl-2">
            <span className=" font-semibold">Username:</span> {personUsername}
          </p>
          <p className="mt-2 pl-2">
            <span className=" font-semibold">Email:</span> {email}
          </p>
        </div>
      )}
      {input && suggestions.length === 0 && gettingData && (
        <div>
          <p className="font-semibold text-slate-500 bg-yellow-200 p-2 mt-4 w-[280px] rounded-md">
            No results found
          </p>
        </div>
      )}
      {info && (
        <div>
          <p className="font-semibold text-red-500 bg-red-500/15 p-2 mt-4 w-[280px] rounded-md">
            {info}
          </p>
        </div>
      )}
    </section>
  );
};

export default Info;
