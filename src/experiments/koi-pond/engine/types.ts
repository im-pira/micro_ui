export type Point = {
  x: number;
  y: number;
};

export type FishPattern = "kohaku" | "sanke" | "yamabuki";

export interface Fish {
  id: number;
  position: Point;
  velocity: Point;
  size: number;
  phase: number;
  turnBias: number;
  pattern: FishPattern;
}

export interface Ripple {
  position: Point;
  radius: number;
  age: number;
  duration: number;
}

export interface PondState {
  fish: Fish[];
  ripples: Ripple[];
  pointer: Point | null;
  width: number;
  height: number;
  time: number;
}