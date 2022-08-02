import * as React from "react";
import type { ComboBoxProps } from "@react-types/combobox";
import { useComboBoxState } from "react-stately";
import { useComboBox, useFilter, useButton } from "react-aria";
import { ChevronDownIcon } from "@heroicons/react/solid";
import "./styles.css";
import { ListBox } from "./ListBox";
import { Popover } from "./Popover";

export { Item, Section } from "react-stately";

export function ComboBox<T extends object>(props: ComboBoxProps<T>) {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let buttonRef = React.useRef(null);
  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);

  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef
    },
    state
  );

  let { buttonProps } = useButton(triggerProps, buttonRef);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      <label
        {...labelProps}
        style={{
          display: "block",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontWeight: 500,
          color: "rgb(55 65 81)",
          textAlign: "left"
        }}
      >
        {props.label}
      </label>
      <div
        className={`${state.isFocused ? "borderPink500" : "borderGrey300"}`}
        style={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "row",
          borderRadius: "0.375rem",
          overflow: "hidden",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          borderWidth: "2px"
        }}
      >
        <input
          {...inputProps}
          ref={inputRef}
          style={{
            outline: "2px solid transparent",
            outlineOffset: "2px",
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem"
          }}
        />
        <button
          {...buttonProps}
          ref={buttonRef}
          className={`${
            state.isFocused
              ? "borderPink500 textPink600"
              : "borderGrey300 textGrey500"
          }`}
          style={{
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            backgroundColor: "rgb(243 244 246)",
            cursor: "default",
            borderLeftWidth: "2px"
          }}
        >
          <ChevronDownIcon
            style={{ width: "1.25rem", height: "1.25rem" }}
            aria-hidden="true"
          />
        </button>
      </div>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </div>
  );
}
