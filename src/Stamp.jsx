import DoneNeutral from "./DoneNeutral";
import DoneWink from "./DoneWink";
import DoneHappy from "./DoneHappy";

export default function Stamp() {
  const icons = [<DoneNeutral />, <DoneWink />, <DoneHappy />];
  const randNum = Math.floor(Math.random() * icons.length);
  const randomIcon = icons[randNum];
  return <>{randomIcon}</>;
}
