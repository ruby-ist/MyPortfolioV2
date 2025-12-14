export interface Project {
  id: number;
  title: string;
  name: string;
  description: string;
  url: string;
}

export const PROJECTS = [
  {
    id: 1,
    title: "GeoBits",
    name: "geobits",
    description:
      "GeoBITS is a web mapping platform exclusively made for navigating and finding classes inside the Bannari Amman Institute of Technology college campus. This project was created without using any pre-existing Map APIs.",
    url: "https://geobits.onrender.com",
  },
  {
    id: 2,
    title: "Ruby on Wasm",
    name: "ruby_on_wasm",
    description:
      " RubyOnWasm is a static page that serves as an online Ruby language interpreter. It runs the code completely on browser using WebAssembly without any backend server. ",
    url: "https://rubyonwasm.onrender.com",
  },
] as Project[];
