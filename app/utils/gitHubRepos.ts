export interface GitHubRepo {
  id: number;
  title: string;
  description: string;
  url: string;
}

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
