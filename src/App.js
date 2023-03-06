import SearchComponent from "./Components/Search";
import UserPrefsProvider from "./provider/UserPrefsProvider";

function App() {
  return (
    <>
      <UserPrefsProvider>
        <SearchComponent />
      </UserPrefsProvider>
    </>
  );
}

export default App;
