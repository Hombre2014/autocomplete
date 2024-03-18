import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import useDebounce from './hooks/use-debounce';
import Controls from './components/Controls';
import Header from './components/Header';
import Info from './components/Info';
import User from './components/User';

interface AppProps {
  placeholder?: string;
}

const App: React.FC<AppProps> = ({ placeholder = 'Search...' }) => {
  const [input, setInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [selected, setSelected] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [personUsername, setPersonUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gettingData, setGettingData] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(input, 750);
  const [info, setInfo] = useState<string>('');

  useEffect(() => {
    if (debouncedValue) {
      getData(debouncedValue);
    } else {
      setSuggestions([]);
      setSelected(false);
    }
  }, [debouncedValue, setSelected]);

  const getData = async (value: string) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) {
        setInfo('Network response was not ok');
        throw new Error('Network response was not ok');
      }

      setInfo('');
      const users: User[] = await response.json();
      setUsers(users);
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(filteredUsers);
      setGettingData(true);
    } catch (error) {
      setInfo('Something went wrong');
    }
  };

  useEffect(() => {
    if (input.length === 0) {
      setGettingData(false);
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSelected(false);
    setButtonClicked(false);
  };

  const highlightMatch = (text: string) => {
    const regex = new RegExp(`(${input})`, 'gi');
    return text.replace(regex, "<span class='bg-yellow-200'>$1</span>");
  };

  const getInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Find the info for the selected user
    const currentUser = users.find((user) => user.name === input);
    if (currentUser) {
      setButtonClicked(true);
      setSuggestions([]);
      setGettingData(false);
      setPersonUsername(currentUser.username);
      setEmail(currentUser.email);
    }
    return currentUser;
  };

  const clearFields = () => {
    setButtonClicked(false);
    setSuggestions([]);
    setSelected(false);
    setGettingData(false);
    setInput('');
    setPersonUsername('');
    setEmail('');
    setInfo('');
  };

  return (
    <div className="w-full md:w-3/4 lg:w-3/4 xl:w-11/12 flex flex-col justify-center items-center mx-auto">
      <Header />
      <div className="flex flex-col items-center">
        <section className="flex flex-col xl:flex-row items-center gap-x-4">
          <form className="relative">
            <IconContext.Provider value={{ color: 'grey' }}>
              <div className="absolute top-3 left-3">
                <FaSearch />
              </div>
            </IconContext.Provider>
            <input
              className="py-2 pl-9 pr-4 outline-none bg-slate-100 w-[280px] rounded-md"
              type="text"
              placeholder={placeholder}
              value={input}
              onChange={handleInputChange}
            />
          </form>
        </section>
        {suggestions.length > 0 && !selected && (
          <ul className="w-[280px] scroll-smooth max-h-[160px] overflow-x-hidden overflow-y-auto">
            {suggestions.map((user) => (
              <li
                key={user.id}
                className="py-2 px-4 cursor-pointer my-1 bg-blue-100/60 hover:bg-blue-200 rounded-md"
                onClick={() => {
                  setInput(user.name);
                  setSuggestions([]);
                  setSelected(true);
                  setGettingData(false);
                }}
                dangerouslySetInnerHTML={{
                  __html: highlightMatch(user.name),
                }}
              ></li>
            ))}
          </ul>
        )}
        <Info
          input={input}
          info={info}
          suggestions={suggestions}
          personUsername={personUsername}
          email={email}
          buttonClicked={buttonClicked}
          gettingData={gettingData}
        />
        <Controls
          input={input}
          selected={selected}
          getInfo={getInfo}
          clearFields={clearFields}
        />
      </div>
    </div>
  );
};

export default App;
