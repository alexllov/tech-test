import PersonForm from "./components/PersonForm";
import PersonView from "./components/PersonView";

function App() {
  return (
    <>
      <div className="flex font-sans min-h-screen bg-harker-background-light text-gray-600 justify-center flex-col md:flex-row gap-10 pt-5 p-5 sm:p-20">
        <div className="border-4 p-2 bg-harker-background-dark border-harker-purple rounded-xl mt-4 h-fit size-full">
          <PersonForm />
        </div>
        <div className="border-4 p-2 bg-harker-background-dark border-harker-purple rounded-xl md:mt-4 h-fit size-full">
          <PersonView />
        </div>
      </div>
    </>
  );
}

export default App;
