import * as React from "react";
import type { ComboBoxProps } from "@react-types/combobox";
import { useComboBoxState, useSearchFieldState } from "react-stately";
import { useComboBox, useFilter, useButton, useSearchField } from "react-aria";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import "./styles.css";
import { ListBox } from "./ListBox";
import { Popover } from "./Popover";

export { Item } from "react-stately";

export function SearchAutocomplete<T extends object>(props: ComboBoxProps<T>) {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);

  let { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef
    },
    state
  );

  // Get props for the clear button from useSearchField
  let searchProps = {
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v)
  };

  let searchState = useSearchFieldState(searchProps);
  let { clearButtonProps } = useSearchField(searchProps, searchState, inputRef);
  let clearButtonRef = React.useRef(null);
  let { buttonProps } = useButton(clearButtonProps, clearButtonRef);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        position: "relative",
        marginTop: "1rem"
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
        className={`
           ${state.isFocused ? "borderPink500" : "borderGrey300"}`}
        style={{
          position: "relative",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: "0.375rem",
          overflow: "hidden",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          borderWidth: "2px"
        }}
      >
        <SearchIcon
          aria-hidden="true"
          style={{
            width: "1.25rem",
            height: "1.25rem",
            color: "rgb(107 114 128)"
          }}
        />
        <input
          {...inputProps}
          ref={inputRef}
          style={{
            outline: "none",
            appearance: "none",
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.375rem",
            paddingBottom: "0.375rem"
          }}
        />
        <button
          {...buttonProps}
          ref={clearButtonRef}
          style={{
            visibility: state.inputValue !== "" ? "visible" : "hidden",
            cursor: "default",
            color: "rgb(107 114 128)"
          }}
          className="textGrey600"
        >
          <XIcon
            aria-hidden="true"
            style={{
              width: "1rem",
              height: "1rem"
            }}
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
