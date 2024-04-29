// LengthValidation.js

import React from "react";

const LengthValidation = ({ maxLength, value }) => {
  const currentLength = value ? value.length : 0
  const isOverMax = currentLength > maxLength;

  return (
    <div className="flex items-center mt-1">
      <div className={`text-sm ${isOverMax ? 'text-red-500' : 'text-gray-500'}`}>
        {currentLength}/{maxLength}
      </div>
      {isOverMax && (
        <div className="ml-2 text-sm text-red-500 animate-pulse">
          Maximal längd ({maxLength} tecken) har överskridits
        </div>
      )}
    </div>
  );
};

export default LengthValidation;
