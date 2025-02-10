/* eslint-disable react/prop-types */

import PropTypes from "prop-types";

function Button({
  text,
  icon,
  iconDirection = "left",
  type = "button",
  variant = "normal",
  width,
  onClick,
  color,
  textPos,
  rounded,
  textSize,
}) {
  const baseStyles = "flex justify-center items-center px-5 py-1   shadow ";
  const variantStyles = {
    normal: "bg-gray-200 text-gray-700 hover:bg-gray-300 ",
    primary: "bg-[#ff2459]  text-white hover:bg-pink-[#ff2459]",
    // secondary:"bg-blue-400 text-white hover:bg-green-600"
  };

  const iconPosition =
    iconDirection === "left" ? "flex-row" : "flex-row-reverse";

  return (
    <button
      style={{ textAlign: "center" }}
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${textSize} ${rounded} ${variantStyles[variant]} ${iconPosition} font-semibold gap-2 ${width} ${textPos} ${color} `}
    >
      {icon && <span className="relative">{icon}</span>}
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
  iconDirection: PropTypes.oneOf(["left", "right"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["normal", "primary"]),
  width: PropTypes.oneOf(["w-full", ""]),
  onClick: PropTypes.func,
  color: PropTypes.color,
  textPos: PropTypes.string,
};

Button.defaultProps = {
  iconDirection: "left",
  type: "button",
  variant: "normal",
  width: "",
  textPos: "text-center",
};

export default Button;
