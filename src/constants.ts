export const COLORS = {
  white: "#f1f5f9",
  whiteGray: "#94a3b8",
  medium: "#64748b",
  mediumNext: "#1e293b",
  darkPrev: "#0f172a",
  dark: "#020617",
};

export const speciesOptions = [
  {
    label: "Alien",
    value: "alien",
  },
  {
    label: "Human",
    value: "human",
  },
];
export const statusOptions = [
  {
    label: "Alive",
    value: "alive",
  },
  {
    label: "Dead",
    value: "dead",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];
export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

export const seasonsOptions = Array.from(Array(5).keys())
  .map((nb) => nb)
  ?.map((seasonNumber) => ({
    label: String(seasonNumber + 1),
    value: String(seasonNumber + 1),
  }));
export const episodesOptions = (episodesQty: number) => {
  return Array.from(Array(episodesQty).keys())
    .map((nb) => nb)
    ?.map((seasonNumber) => ({
      label: String(seasonNumber + 1),
      value: String(seasonNumber + 1),
    }));
};

export const API_URL = `${process.env.API_URL}` || "";

export const SERIE_SEASONS_COUNT = 5;

export enum EPISODE_STATUS_ENUM {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
}
