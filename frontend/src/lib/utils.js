// export const getDifficultyBadgeClass = (difficulty) => {
//     switch (difficulty.toLowerCase()) {
//         case "easy" : 
//             return "badge-success";
//         case "medium" : 
//             return "badge-warning";
//         case "hard" : 
//             return "badge-error";
//         default :
//             return "badge-ghost"
//     }
// }

export const getDifficultyBadgeClass = (difficulty = "") => {
  const map = {
    easy: "badge-success",
    medium: "badge-warning",
    hard: "badge-error",
  };

  return map[difficulty.toLowerCase()] ?? "badge-ghost";
};