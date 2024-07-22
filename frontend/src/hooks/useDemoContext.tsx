import { DemoContext } from "@/contexts/DemoContext";
import { useContext, useEffect } from "react";

function useDemoContext() {
  const context = useContext(DemoContext);

  return context;
}
// function useDemoContext(tableauInitial: string[]) {
//     const context = useContext(DemoContext);
//     useEffect(() => {
//             context.setState(tableauInitial)
//     },[])

//   return context;
// }

export default useDemoContext;
