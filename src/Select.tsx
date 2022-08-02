import * as React from "react";
import type { AriaSelectProps } from "@react-types/select";
import { useSelectState } from "react-stately";
import {
  useSelect,
  HiddenSelect,
  useButton,
  mergeProps,
  useFocusRing
} from "react-aria";
import { SelectorIcon } from "@heroicons/react/solid";
import "./styles.css";
import { ListBox } from "./ListBox";
import { Popover } from "./Popover";

export { Item } from "react-stately";

export function Select<T extends object>(props: AriaSelectProps<T>) {
  // Create state based on the incoming props
  let state = useSelectState(props);

  // Get props for child elements from useSelect
  let ref = React.useRef(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref);

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        position: "relative",
        width: "13rem",
        marginTop: "1rem"
      }}
    >
      <div
        {...labelProps}
        style={{
          display: "block",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontWeight: 500,
          color: "rgb(55 65 81)",
          textAlign: "left",
          cursor: "default"
        }}
      >
        {props.label}
      </div>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        style={{
          padding: "0.25rem",
          paddingLeft: "0.75rem",
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          position: "relative",
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "between",
          borderRadius: "0.375rem",
          overflow: "hidden",
          cursor: "default",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          borderWidth: "2px",
          outline: "none"
        }}
        className={`
                    ${isFocusVisible ? "borderPink500" : "borderGrey300"} ${
          state.isOpen ? "borderGrey100" : "bgWhite"
        }`}
      >
        <span
          {...valueProps}
          className={`${state.selectedItem ? "textGrey800" : "textGrey500"}`}
        >
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <SelectorIcon
          style={{
            width: "1.25rem",
            height: "1.25rem"
          }}
          className={`${isFocusVisible ? "textPink500" : "textGrey500"}`}
        />
      </button>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}
