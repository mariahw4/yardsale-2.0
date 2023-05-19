import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import HomepageHandler from "./pages/Homepage";
import Profile from "./pages/Profile";
import Navbar from "./components/NavigationBar";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/GlobalState";

// / Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        // <ApolloProvider client={client}>
        //   <Router>
        //     <>
        //       <Navbar />
        //       <Routes>
        //         <Route
        //           path='/'
        //           element={<SearchBooks />}
        //         />
        //         <Route
        //           path='/saved'
        //           element={<SavedBooks />}
        //         />
        //         <Route
        //           path='*'
        //           element={<h1 className='display-2'>Wrong page!</h1>}
        //         />
        //       </Routes>
        //     </>
        //   </Router>
        // </ApolloProvider>

        <ApolloProvider client={client}>
            <Router>
                <>
                <StoreProvider>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={HomepageHandler} />
                        <Route exact path="/profile" component={Profile} />
                        <Route
                            render={() => (
                                <h1 className="display-2">Wrong page!</h1>
                            )}
                        />
                    </Switch>
                    </StoreProvider>
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
