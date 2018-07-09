export interface RecJog {
  readonly id: number;
  pretty_time: string;
  date: string;
  distance: number;
  speed: number;
  readonly user_id: number
}

// export function isJog(testObj: any): testObj is RecJog{
//   return testObj.pretty_time !== undefined;
// }
