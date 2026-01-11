import React from "react";
import IcoMoon from "react-icomoon";
import iconSet from "./selection.json";

interface IconsProps {
  icon: string;
  size?: number;
  [key: string]: any;
}

const Icons: React.FC<IconsProps> = ({ ...props }) => {
  return <IcoMoon iconSet={iconSet} {...props} />;
};

export default Icons;

