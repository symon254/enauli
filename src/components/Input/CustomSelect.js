import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Ripple from "material-ripple-effects";
import Tippy from "@tippyjs/react";
import {
  filledBgColors,
  filledBgHoverColors,
  filledBgFocusColors,
  filledBgActiveColors,
  filledShadowColors,
  filledShadowHoverColors,
  outlineTextColors,
  outlineBorderColors,
  outlineBgHoverColors,
  outlineBorderHoverColors,
  outlineTextHoverColors,
  outlineBgActiveColors,
} from "../../utils/Colors";
import { useStateContext } from "../../context/ContextProvider";

const Select = ({
  buttonText,
  placeholder,
  value,
  options = [],
  color,
  buttonType,
  size = "regular",
  placement = "bottom-start",
  rounded,
  block,
  hover,
  ripple,
  className,
  onChange,
  icon,
  ...rest
}) => {
  const rippleEffect = new Ripple();

  const { currentColor } = useStateContext();
  const [, setHover] = useState(false);
  const [show, setShow] = useState(false);
  const [valueTxt, setValueTxt] = useState("");

  // Styles
  let classes = [];

  const style = {
    normal: {
      boxShadow: `hover:shadow-md-${currentColor}`,
    },
    hover: {
      background: currentColor,
    },
  };

  rounded = rounded ? "rounded-full" : "rounded-lg";
  icon = icon ? icon : null;

  const sharedClasses = [
    hover && "transition duration-200 ease-in hover:scale-105 transform-gpu",
    block && "w-full",
    "flex",
    "items-center",
    "justify-center",
    "gap-1",
    "rounded-lg",
    "font-bold",
    "outline-none",
    "capitalize",
    "tracking-wider",
    "focus:outline-none",
    "transition-all",
    "duration-300",
    rounded,
  ];

  const buttonFilled = [
    "text-white",
    filledBgColors[color],
    filledBgHoverColors[color],
    filledBgFocusColors[color],
    filledBgActiveColors[color],
    filledShadowColors[color],
    filledShadowHoverColors[color],
  ];

  const buttonOutline = [
    "bg-transparent",
    "border",
    "border-solid",
    "shadow-none",
    outlineTextColors[color],
    outlineBorderColors[color],
    outlineBgHoverColors[color],
    outlineBorderHoverColors[color],
    outlineTextHoverColors[color],
    outlineBgHoverColors[color],
    outlineBgActiveColors[color],
  ];

  const buttonLink = [
    `bg-transparent`,
    outlineTextColors[color],
    outlineBgHoverColors[color],
    outlineTextHoverColors[color],
    outlineBgHoverColors[color],
    outlineBgActiveColors[color],
  ];

  const buttonXS = [
    ...sharedClasses,
    "py-1 pl-4 pr-2",
    "text-xs",
    "leading-normal",
  ];

  const buttonSM = [
    ...sharedClasses,
    "py-1.5 pl-5 pr-3",
    "text-sm",
    "leading-normal",
  ];
  const buttonRegular = [
    ...sharedClasses,
    "p-2.5 pl-4 pr-3",
    "text-sm",
    "leading-normal",
  ];
  const buttonLG = [
    ...sharedClasses,
    "py-3 pl-8 pr-6",
    "text-base",
    "leading-relaxed",
  ];

  if (size === "sm") {
    classes.push(...buttonSM);
  } else if (size === "lg") {
    classes.push(...buttonLG);
  } else if (size === "xs") {
    classes.push(...buttonXS);
  } else {
    classes.push(...buttonRegular);
  }

  if (buttonType === "outline") {
    classes.push(...buttonOutline);
  } else if (buttonType === "link") {
    classes.push(...buttonLink);
  } else {
    classes.push(...buttonFilled);
  }

  classes = classes.join(" ");

  // This method handles the click that happens outside the
  // select text and list area
  const handleClickOutside = (e) => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    setValueTxt(buttonText);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select-container flex items-center">
      <Tippy
        content={
          <div
            className={`themeText themeSideBackground ring-color z-50 float-left mt-1 list-none overflow-hidden rounded-lg bg-white p-2 text-left text-base shadow-xl ring-1 transition-all duration-500`}
            style={{ minWidth: "13rem" }}
          >
            <ul>
              {options.map((option, index) => {
                return (
                  <li
                    {...rest}
                    key={index}
                    value={option.value}
                    name={option.label}
                    onClick={(e) => {
                      onChange(e.target.getAttribute("value"));
                      setValueTxt(e.target.getAttribute("name"));
                    }}
                    className={`whitespace-no-wrap themeText my-1 block w-full cursor-pointer overflow-hidden rounded-md py-2 px-3 text-sm font-normal transition-all hover:bg-[${currentColor}] hover:shadow-md-[${currentColor}] duration-300 ease-in-out hover:scale-105 hover:text-white`}
                    onMouseUp={(e) => {
                      ripple === "dark" && rippleEffect.create(e, "dark");
                      ripple === "light" && rippleEffect.create(e, "light");
                    }}
                    onMouseEnter={() => {
                      setHover(true);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                    }}
                    style={{
                      ...style.normal,
                      ...(hover ? style.hover : null),
                    }}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          </div>
        }
        animation="scale"
        trigger="click"
        offset={[0, 0]}
        placement={placement}
        interactive
      >
        <button
          type="button"
          className={`${classes} ${className} ${show && "selected-text"}`}
          onClick={() => setShow(!show)}
          onMouseUp={(e) => {
            ripple === "dark" && rippleEffect.create(e, "dark");
            ripple === "light" && rippleEffect.create(e, "light");
          }}
        >
          {valueTxt || placeholder}

          <span className={`align-middle text-lg leading-none `}>
            {show && !icon ? (
              <i className={`bx bx-chevron-up `} />
            ) : (
              <i className={`bx bx-chevron-down `} />
            )}
          </span>
        </button>
      </Tippy>

      {valueTxt && !icon && (
        <span
          className=" themeText cursor-pointer px-1 align-middle text-xl leading-none transition-all duration-300 ease-in-out hover:scale-110 hover:text-2xl"
          onClick={(e) => {
            setShow(show);
            onChange(String());
            setValueTxt("");
          }}
        >
          &times;
        </span>
      )}
    </div>
  );
};

export default Select;
