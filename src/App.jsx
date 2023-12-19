import { useState, useEffect } from "react";
import Theme from "./components/Theme";
import Desktop from "./components/icons/Desktop";
import Moon from "./components/icons/Moon";
import Sun from "./components/icons/Sun";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || null);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        // setTheme("dark"); // uncomment if no icon for system preffered
      } else {
        document.documentElement.classList.remove("dark");
        // setTheme("light"); // uncomment if no icon for system preffered
      }
    }
  }, [theme]);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // localStorage.removeItem("theme"); // uncomment if no icon for system preffered
      if (!("theme" in localStorage)) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          // setTheme("dark"); // uncomment if no icon for system preffered
        } else {
          document.documentElement.classList.remove("dark");
          // setTheme("light"); // uncomment if no icon for system preffered
        }
      }
    });

  return (
    <main className="container mx-auto -mt-10 w-10/12 rounded-xl bg-slate-100 dark:bg-[#1b1b1b] dark:text-slate-200">
      <div className="relative mt-10 flex h-screen w-full flex-col gap-40 rounded-2xl p-10">
        <div className="absolute right-[30px] top-[20px] w-[135px] rounded-lg  text-right ">
          <button
            onClick={() => {
              setTheme("dark");
            }}
            className=" rounded-l-lg bg-[#fafafa] px-3 py-2 active:scale-[.9] dark:bg-[#525151]"
          >
            <Moon size={"20"} fill={`${theme === "dark" && "blue"}`} />
          </button>
          <button
            onClick={() => {
              setTheme("light");
            }}
            className="bg-[#fafafa] px-3  py-2 active:scale-[.9] dark:bg-[#525151]"
          >
            <Sun size={"20"} fill={`${theme === "light" && "blue"}`} />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("theme");
              setTheme(null);
            }}
            className="rounded-r-lg bg-[#fafafa] px-3 py-2 active:scale-[.9] dark:bg-[#525151]"
          >
            <Desktop size={"20"} fill={`${!theme && "blue"}`} />
          </button> 
        </div>

        <div>
          <Theme />
        </div>
      </div>
    </main>
  );
}

export default App;
