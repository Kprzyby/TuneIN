import { useEffect, useState } from "react";
// api already exists in node
// const useMediaQuery = (query: string) => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [matches, setMatches] = useState(false);
//     useEffect(() => {
//         const mediaQuery = window.matchMedia(query);
//         setMatches(mediaQuery.matches);
//         const handler = (e: any) => {
//             setMatches(e.matches);
//         }
//         mediaQuery.addEventListener("change", handler);
//         return () => {
//             mediaQuery.removeEventListener("change", handler);
//         }
//     },[]);
//     return matches;
// }
// export default useMediaQuery;
