export interface Project {
  id: number;
  title: string;
  name: string;
  description: string;
  url: string;
  imagesCount: number;
  type: "responsive" | "mobile";
}

export const PROJECTS = [
  {
    id: 1,
    title: "GeoBits",
    name: "geobits",
    description:
      "GeoBITS is a web mapping platform exclusively made for navigating and finding classes inside the Bannari Amman Institute of Technology college campus. This project was created without using any pre-existing Map APIs.",
    url: "https://geobits.onrender.com",
    imagesCount: 5,
    type: "responsive",
  },
  {
    id: 2,
    title: "Local Ledger",
    name: "local_ledger",
    description:
      "Local Ledger is a minimal Progressive Web App (PWA) that helps you track expenses effortlessly. It works completely offline, with features like filters for organizing transactions, interactive graphs for visualizing spending, and import/export options for easy data management. With a clean, simple interface, it offers a secure and hassle-free way to manage your finances on your mobile.",
    url: "https://rubyonwasm.onrender.com",
    imagesCount: 3,
    type: "mobile",
  },
  {
    id: 3,
    title: "Ruby on Wasm",
    name: "ruby_on_wasm",
    description:
      "RubyOnWasm is a static page that serves as an online Ruby language interpreter. It runs the code completely on browser using WebAssembly without any backend server. ",
    url: "https://rubyonwasm.onrender.com",
    imagesCount: 3,
    type: "responsive",
  },
] as Project[];
