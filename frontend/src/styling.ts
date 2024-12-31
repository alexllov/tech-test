import clsx from "clsx";

// Re-used classNames
// Styling based on 'Outlined success' (https://flowbite.com/docs/forms/floating-label/)
export const labelClassName = clsx(
  "absolute text-sm text-gray-600 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-harker-background-dark dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-harker-purple peer-focus:dark:text-harker-purple peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
);
export const inputClassName = clsx(
  "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-harker-purple focus:outline-none focus:ring-0 focus:border-harker-purple peer"
);
export const buttonClassName = clsx(
  "bg-harker-purple hover:bg-harker-purple-modified text-white font-bold py-2 px-4 rounded-lg"
);
export const errorClassName = clsx("text-red-400 text-sm");
