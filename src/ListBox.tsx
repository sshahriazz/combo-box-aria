/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { ListState } from "react-stately";
import type { Node } from "@react-types/shared";
import { useListBox, useListBoxSection, useOption } from "react-aria";
import { CheckIcon } from "@heroicons/react/solid";
import "./styles.css";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export function ListBox(props: ListBoxProps) {
  let ref = React.useRef<HTMLUListElement>(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      style={{
        maxHeight: "18rem",
        overflow: "auto",
        outline: "2px solid transparent",
        outlineOffset: "2px"
      }}
    >
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
}

function ListBoxSection({ section, state }: SectionProps) {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"]
  });

  return (
    <>
      <li {...itemProps} style={{ paddingTop: "0.5rem" }}>
        {section.rendered && (
          <span
            {...headingProps}
            style={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "rgb(107 114 128)",
              marginLeft: "0.75rem",
              marginRight: "0.75rem"
            }}
          >
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

function Option({ item, state }: OptionProps) {
  let ref = React.useRef<HTMLLIElement>(null);
  let { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key
    },
    state,
    ref
  );

  let text = "textGrey700";
  if (isFocused || isSelected) {
    text = "textPink600";
  } else if (isDisabled) {
    text = "textGrey200";
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`${text} ${isFocused ? "bgPink100" : ""} ${
        isSelected ? "fontBold" : ""
      }`}
      style={{
        margin: "0.25rem",
        borderRadius: "0.375rem",
        padding: "0.5rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        outline: "2px solid transparent",
        outlineOffset: "2px",
        cursor: "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {item.rendered}
      {isSelected && (
        <CheckIcon
          aria-hidden="true"
          style={{
            width: "1.25rem",
            height: "1.25rem",
            color: "rgb(219 39 119)"
          }}
        />
      )}
    </li>
  );
}
