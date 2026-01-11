import React from "react";
import Block from "./Block";

interface Widget {
  id?: string | number;
  widget_type?: string;
  [key: string]: any;
}

interface WidgetBlocksProps {
  widgets?: Widget[];
}

const WidgetBlocks: React.FC<WidgetBlocksProps> = ({
  widgets = [],
}) => {
  const child = widgets.map((widget, index) => (
    <Block
      key={widget.id || `widget-${index}`}
      widget={widget}
    />
  ));

  return <>{child}</>;
};

export default WidgetBlocks;

