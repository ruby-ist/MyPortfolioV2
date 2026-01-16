export interface Project {
  id: number;
  title: string;
  name: string;
  description: string;
  url: string;
  imagesCount: number;
  type: "responsive" | "mobile";
  heightWidthRatio: number;
}

export interface GitHubRepo {
  id: number;
  title: string;
  description: string;
  url: string;
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
    heightWidthRatio: 0.63,
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
    url: "https://local-ledger.onrender.com",
    imagesCount: 7,
    type: "mobile",
    heightWidthRatio: 2.35,
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
    heightWidthRatio: 0.63,
  },
] as Project[];

export const GITHUB_REPOS = [
  {
    id: 1,
    title: "Weaviate Record",
    description:
      "Weaviate Record is an ORM for Weaviate vector database that follows " +
      "the same conventions as the ActiveRecord and brings the power of " +
      "Vector database and Retrieval augmented generation (RAG) to your " +
      "Ruby/Rails application.",
    url: "https://github.com/ruby-ist/weaviate_record",
  },
  {
    id: 2,
    title: "Dijkstra Trace",
    description:
      "Dijkstra trace is an ruby gem to find the shortest path between two " +
      "places in the graph using the Dijkstra algorithm. The user would " +
      "first need to create an object for the graph and can add edges of " +
      "that graph object. The edge name can be a number, character or " +
      "strings. After adding the edges, the shortest path between any two " +
      "edges can be easily calculated.",
    url: "https://github.com/ruby-ist/dijkstra_trace",
  },
];
