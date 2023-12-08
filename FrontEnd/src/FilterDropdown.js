
import React, { useState } from 'react';

const FilterDropdown = ({ label, options=[], name }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={selectedValue} onChange={handleChange}>
        <option value=''> </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;



















// import React, { useState } from 'react';

// const FilterDropdown = ({ label, options = [], name }) => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState('');

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedValue(option);
//     setDropdownOpen(false);
//   };

//   return (
//     <div className="filter-dropdown">
//       <label htmlFor={name}>{label}</label>
//       <div className="dropdown-container">
//         <div className="arrow-icon" onClick={toggleDropdown}>
//           <svg
//             focusable="false"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 45 45"
//             fill="#ffffff"
//             width="16px"
//             height="16px"
//           >
//             <circle cx="22.5" cy="22.5" r="22.5" fill="#ffffff" />
//             <path d="M22.5 27.45L9.672 14.625a1.375 1.375 0 0 0-1.938 1.943l13.838 13.807a1.378 1.378 0 0 0 1.94 0l13.813-13.807a1.378 1.378 0 0 0-1.94-1.94z" fill="#000000" />
//           </svg>
//         </div>
//         {isDropdownOpen && (
//           <div className="dropdown-options">
//             {options.map((option, index) => (
//               <div key={index} className="option" onClick={() => handleOptionClick(option)}>
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
  
//     </div>
//   );
// };

// export default FilterDropdown;
