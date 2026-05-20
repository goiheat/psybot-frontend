export type Methodology = "CBT" | "ACT";

export interface Technique {
  id: string;
  name: string;
  methodology: Methodology;
  description: string;
  durationMin: number;
}

export const sampleTechniques: Technique[] = [
  {
    id: "box-breathing",
    name: "Дыхание 4-4-4-4",
    methodology: "CBT",
    description:
      "Короткое дыхание боксом для быстрой стабилизации в момент острой тревоги.",
    durationMin: 4,
  },
  {
    id: "5-4-3-2-1",
    name: "Заземление 5-4-3-2-1",
    methodology: "CBT",
    description:
      "Возвращение в тело через органы чувств — назови пять предметов, четыре звука, три ощущения.",
    durationMin: 6,
  },
  {
    id: "leaves-on-stream",
    name: "Листья на ручье",
    methodology: "ACT",
    description:
      "Когнитивная диффузия — наблюдаем тревожные мысли, не сливаясь с ними.",
    durationMin: 8,
  },
  {
    id: "values-anchor",
    name: "Якорь ценностей",
    methodology: "ACT",
    description:
      "Возвращаемся к тому, что для тебя важно — чтобы движение шло не от страха, а в сторону.",
    durationMin: 10,
  },
];
