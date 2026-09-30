import { filterByTech, parseTechParam, techOptions } from "../lib/projectFilter";

const projects = [
  { id: "a", tags: ["Kafka", "Spark", "SQL"] },
  { id: "b", tags: ["BigQuery", "SQL"] },
  { id: "c", tags: ["Power BI", "SQL", "Spark"] },
];

describe("techOptions", () => {
  it("liste chaque techno une fois, les plus utilisées d'abord puis par ordre alphabétique", () => {
    expect(techOptions(projects)).toEqual(["SQL", "Spark", "BigQuery", "Kafka", "Power BI"]);
  });
});

describe("filterByTech", () => {
  it("renvoie tout quand rien n'est coché", () => {
    expect(filterByTech(projects, [])).toEqual(projects);
  });

  it("ne garde que les projets qui ont toutes les technos cochées", () => {
    expect(filterByTech(projects, ["SQL", "Spark"]).map((p) => p.id)).toEqual(["a", "c"]);
    expect(filterByTech(projects, ["Kafka", "Power BI"])).toEqual([]);
  });
});

describe("parseTechParam", () => {
  it("lit une liste séparée par des virgules et ignore les technos inconnues", () => {
    expect(parseTechParam("Kafka,Nope,SQL", ["Kafka", "SQL"])).toEqual(["Kafka", "SQL"]);
    expect(parseTechParam(null, ["Kafka"])).toEqual([]);
  });
});
