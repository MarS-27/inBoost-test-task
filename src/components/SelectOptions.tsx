import clsx from "clsx";
import { type FC } from "react";
import { type TNodeVariants } from "../types/types";

const selectOptions = ["1", "2", "3", "4", "5", "6"];

type TSelectOptionsProps = {
  checkedVariant: TNodeVariants | undefined;
  handleSelectVariant: (item: string) => void;
};

export const SelectOptions: FC<TSelectOptionsProps> = ({
  checkedVariant,
  handleSelectVariant,
}) => {
  return (
    <div className="select-options">
      {selectOptions.map((item) => (
        <div
          className="select-option"
          key={item}
          onClick={() => handleSelectVariant(item)}
        >
          <div
            className={clsx(
              "checkbox",
              checkedVariant?.variant === item ? "checkbox-isChecked" : ""
            )}
          ></div>
          <p>Варіант {item}</p>
        </div>
      ))}
    </div>
  );
};
