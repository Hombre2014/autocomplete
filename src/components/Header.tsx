const Header = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-16 mb-8">
        Auto Complete
      </h1>
      <p className="text-center mb-6 text-slate-500 px-4">
        Take home assignment for Deel&#39;s Frontend Engineer (React.js)
        position
      </p>
      <p className="text-center text-sm mb-6 text-slate-500 mx-auto w-3/4">
        <span className="font-bold">Note: </span>
        The data is fetched from an API at{' '}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://jsonplaceholder.typicode.com/users"
          className="underline"
        >
          https://jsonplaceholder.typicode.com/users
        </a>{' '}
        and is stored locally in the app&#39;s state
      </p>
      <p className="px-4 text-center mb-2 md:text-lg">
        Start typing the user&#39;s name to see the suggestions
      </p>
      <p className="text-center mb-6">
        <span className="text-slate-500 font-bold">Hint:</span> Try 'le'
      </p>
    </div>
  );
};

export default Header;
