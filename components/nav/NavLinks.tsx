// import { PageItems } from "@/constants/constants";
// import Link from "next/link";
// import React from "react";

// export default function NavLinks() {
//   return (
//     <nav className="md:block hidden">
//       <div className="flex justify-center space-x-4">
//         {PageItems.map((item) => (
//           <Link href={item.link} key={item.name}>
//             <div className="flex flex-col items-center cursor-pointer">
//               <span className="text-sm font-medium">{item.name}</span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// }

import { PageItems } from "@/constants/constants";
import Link from "next/link";
import React from "react";

export default function NavLinks() {
  return (
    <nav className="md:block hidden">
      <div className="flex justify-center space-x-4">
        {PageItems.map((item) => (
          <Link href={item.link} key={item.name}>
            <div className="flex flex-col items-center cursor-pointer hover:text-blue-500 focus:text-blue-700">
              <span className="text-sm font-medium">{item.name}</span>
              <div className="w-full h-0.5 bg-transparent hover:bg-blue-500 focus:bg-blue-700 rounded-full transition-colors duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
