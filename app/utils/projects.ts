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
      "GeoBITs is a custom-built web mapping and navigation platform developed exclusively for the " +
      "Bannari Amman Institute of Technology campus. Built without relying on any third-party map APIs, " +
      "it features an SVG map meticulously drawn using Illustrator, combined with a satellite layer " +
      "stitched from satellite images. The platform supports dynamic route rendering through SVG animations " +
      "and uses Dijkstra’s algorithm to compute the shortest paths. It provides detailed information " +
      "for every building, class, and lab, allows users to pin, share, and navigate to locations, " +
      "and offers real-time, indoor-style location tracking by mapping device latitude and longitude to the campus layout.",
    url: "https://geobits.onrender.com",
    imagesCount: 5,
    type: "responsive",
  },
  {
    id: 2,
    title: "Local Ledger",
    name: "local_ledger",
    description:
      "Local Ledger is a minimal Progressive Web App (PWA) that helps you track expenses effortlessly. " +
      "It works completely offline, with features like filters for organizing transactions, " +
      "interactive graphs for visualizing spending, and import/export options for easy data management. " +
      "With a clean, simple interface, it offers a secure and hassle-free way to manage your finances on your mobile.",
    url: "https://rubyonwasm.onrender.com",
    imagesCount: 7,
    type: "mobile",
  },
  {
    id: 3,
    title: "Ruby on Wasm",
    name: "ruby_on_wasm",
    description:
      "RubyOnWasm is a fully browser-based Ruby interpreter built with WebAssembly, " +
      "requiring no backend server. Powered by Ruby 3.2.0’s WASI support, it runs CRuby " +
      "directly in the browser and other WASM environments. The platform includes " +
      "syntax highlighting, code execution, copy support, keyboard shortcuts, and " +
      "native sharing via the Web Share API.",
    url: "https://rubyonwasm.onrender.com",
    imagesCount: 3,
    type: "responsive",
  },
] as Project[];
