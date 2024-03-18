# Part 2 - Questions

> Take home assignment for Deel's Frontend Engineer (React.js) position

<hr>

## Questions

1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.
   > The main difference between the Component and PureComponent base classes is how they handle re-rendering. The Component class will re-renders when the props or state change, but the PureComponent class will also perform a shallow comparison of the props and state before re-rendering and will do so only if there is a change between current and previous props or state.
   >
   > > When this could lead to PureComponent breaking the app? The problem might occur when there is a complex data in the props or state, including nested objects and arrays. When the PureComponent is performing shallow comparison of complex data, it compares them by reference and it might not be able to detect changes made in the data by directly manipulating it or withing the nested objects.
2. Context + ShouldComponentUpdate might be dangerous. Why is
   that?
   > When the Context is changed it triggers a re-render of all the components consuming that context and it is regardless of the change of their own props or state. This might lead to a performance issue and unnecessary re-renders. From other hand the ShouldComponentUpdate allows the component to determine if it should re-render or not, based on its own props and state changes.
   >
   > > So, when these two are used together, it might get a bit tricky to decide when and what to re-render. Why this might be dengerous? Well, I think if shouldComponentUpdate with Context is not properly implemented, the component might incorrectly decide not to re-render. This might lead to incorect data displayed or an outdated data, inconsistencies, etc.
3. Describe 3 ways to pass information from a component to its
   PARENT.
   > 1. The most strightforward way is to pass a callback function from the parent component to the child. In the child component, the function will be called via props, using data from the child. And finally the results from the function execution will be available in the parent.
   > 2. Another way is to use the context API. The parent component could define a context and passes down a function to update its state. And in the child component, the passed function can be used to update the parent's state.
   > 3. The third way is through event bubbling.For example an event handler attached to the child component can be bubbled up to the parent component when it is triggered. Tha parent component can then handle the data passed from the child.
4. Give 2 ways to prevent components from re-rendering.
   > 1. I was thinking about the PureComponent, as I mentioned in question number 1. So, it might be a side effect, but it might lead to avoiding unnecessary re-renders. For the functional components, we can use in similar way useMemo hook. It memoizing the component and only re-renders when the props change.
   > 2. Using the useRef hook. It allows us to store a mutable value that persists between renders, but do not impact the components re-rendering. In this way we can have a reference to the value without causing a re-render when this value changes.
5. What is a fragment and why do we need it? Give an example where it
   might break my app.
   > A fragment is a special React element that allows us to group a number of side by side components without adding extra nodes to the DOM.
   >
   > > I can't think of a case where it might brake up the app, beside if I am going to use the fragment for a component, which requires a key property and I omit it. In the case there will be no unique key for each element and it will be difficult for React to identify them.
6. Give 3 examples of the HOC pattern.
   > The HOC (High Order Component) pattern is used to wrap a component in another component that adds some functionality.
   >
   > 1. For example we can use a HOC with Authentication. IT will wraps the component amd check to find out f the user is authenticated. If it is so, then it will render the wrapped content, otherwise it might redirect to the login page.
   > 2. Very common case is a HOC with Loading functionality. The HOC will add a loading state to the component and it might render the component only when the loading state is false (completed), otherwise it will show some kind of spinner or loading indicator.
   > 3. The HOC with Error Handling. Whenever we have for example try catch block statement, we can use HOC to wrap the component and handle the errors.
7. What's the difference in handling exceptions in promises,
   callbacks and async…await?

   > Promises - uses .then() method to handle the successfull result and .catch() method to handle the error. For example:

   ```javascript
   fetch('https://api.example.com/data')
     .then((response) => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then((data) => {
       // Handle data
     })
     .catch((error) => {
       // Handle error
     });
   ```

   > Callbacks - are the traditional way of handling asynchronous operations in JavaScript. Error handling in callbacks usually involves passing an additional argument to the callback function to handle any errors that occurs. It is common practice to use the first argument `err` of the callback function to handle the error. If there is no error, we can pass `null`. For example:

   ```javascript
   function fetchData(callback) {
     // Asynchronous operation
     if (error) {
       callback(new Error('An error occurred'));
     } else {
       callback(null, data);
     }
   }
   fetchData((err, data) => {
     if (err) {
       // Handle error
     } else {
       // Handle data
     }
   });
   ```

   > Async/await is the new way to handle asynchronous operations. It resolves the promise and in a different way. It uses the `await` key word to pause the execution until the promise is resolved. Use the .then() method to handle the successfull result. The errors are handled with .catch() method. For example:

   ```javascript
   async function fetchData() {
     try {
       const response = await fetch('https://api.example.com/data');
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const data = await response.json();
       // Handle data
     } catch (error) {
       // Handle error
     }
   }
   ```

8. How many arguments does setState take and why is it async.
   > The setState function takes two arguments. The first is the new state and the second is the callback function. It is optional. The callback function is executed after the state is updated and the component is re-rendered.
   >
   > > The way that React handles state updates is asynchronous by nature. React schedules the state updates for some time in the future. It does not do that immediatelly. It also combines multiple state updates into one update.
9. List the steps needed to migrate a Class to Function Component.
   > There are several steps to migrate a Class to Function Component.
   - Study and get familiar with the Class component and its functionality.
   - Is there any state variables? If there is `this.state` variables in the Class component we have to replace them with `useState` hook in the function component to manage the state.
   - Lifecycle methods like `componentDidMount`, `componentDidUpdate` etc. We can use the `useEffect` hook in the function component to replicate the necessary behavior.
   - Converting the Class component to the function component. Remove the `class` keyword and replace it with `function`. Remove the `render` method and replace it with `return`. Remove the `constructor` method and any references of `this`. Remodel the lifecycle methods from the Class component to `useEffect` hooks in the function component.
10. List a few ways styles can be used with components.

    > The standard way of using the styles in React is to use CSS modules. For example:

    ```javascript
    import styles from './MyComponent.module.css';

    const MyComponent = () => {
      return <div className={styles.container}>My Component</div>;
    };
    ```

    > Another way to use the styles in React is to use Inline Styles. For example:

    ```javascript
    const MyComponent = () => {
      return <div style={{ color: 'red', fontSize: '18px' }}>My Component</div>;
    };
    ```

    > Probably the most traditional way of using the styles in React is to use global Stylesheets. For example:

    ```javascript
    import './styles.css';

    const MyComponent = () => {
      return <div className="container">My Component</div>;
    };
    ```

    > My personal preference is to use Tailwind CSS for styling. You can add Tailwind CSS to any React project by:

    `npm install -D tailwindcss`<br />
    `npx tailwindcss init`

    > Then modify the tailwind.config.js file as follows:

    ```javascript
    module.exports = {
      content: ['./src/**/*.{js,jsx,ts,tsx}'],
    };
    ```

    > Add the Tailwind directive `@tailwind base;` and `@tailwind components;` and `@tailwind utilities;` to the top of your `index.css` file.

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

    > Now I can use Tailwind CSS in my React project.

    ```javascript
    const MyComponent = () => {
      return (
        <div className="flex justify-center">
          <h1 className="text-xl font-bold">My Component</h1>
        </div>;
      )
    };
    ```

11. How to render an HTML string coming from the server.

    > To render an HTML string coming from the server, we can use the `dangerouslySetInnerHTML` attribute. But this should be used with caution, because it can lead the application to exposure of cross-site scripting (XSS) attacks. For example:

    ```javascript
    const MyComponent = () => {
      return (
        <div dangerouslySetInnerHTML={{ __html: '<h1>Hello World</h1>' }} />
      );
    };
    ```
