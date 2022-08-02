import * as React from "react";
import { ComboBox, Item, Section } from "./ComboBox";
import { Select } from "./Select";
import { SearchAutocomplete } from "./SearchAutocomplete";
import "./styles.css";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "32rem"
      }}
    >
      {/* prettier-ignore */}
      <p style={{marginTop: '2rem', marginBottom:'4rem',color: 'rgb(75 85 99)'}}>This sandbox shows examples of <strong><code>ComboBox</code></strong>, <strong><code>Select</code></strong>, and <strong><code>SearchAutocomplete</code></strong> components built with <a href="https://react-spectrum.adobe.com/react-aria/" rel="noreferrer" target="_blank" style={{	color: 'rgb(29 78 216)',textDecorationLine: 'underline'}}>React Aria</a> and <a href="http://tailwindcss.com/" rel="noreferrer" target="_blank" style={{	color: 'rgb(29 78 216)',textDecorationLine: 'underline'}} >Tailwind CSS</a>. They all share the same <code>Popover</code> and <code>ListBox</code> components, which are used to show their options.</p>
      <ComboBox label="Favorite Animal">
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
        <Item key="dog">Dog</Item>
        <Item key="aardvark">Aardvark</Item>
        <Item key="kangaroo">Kangaroo</Item>
        <Item key="snake">Snake</Item>
      </ComboBox>
      <Select label="Favorite Animal">
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
        <Item key="dog">Dog</Item>
        <Item key="aardvark">Aardvark</Item>
        <Item key="kangaroo">Kangaroo</Item>
        <Item key="snake">Snake</Item>
      </Select>
      <SearchAutocomplete label="Search" allowsCustomValue>
        <Section title="Companies">
          <Item>Chatterbridge</Item>
          <Item>Tagchat</Item>
          <Item>Yambee</Item>
          <Item>Photobug</Item>
          <Item>Livepath</Item>
        </Section>
        <Section title="People">
          <Item>Theodor Dawber</Item>
          <Item>Dwight Stollenberg</Item>
          <Item>Maddalena Prettjohn</Item>
          <Item>Maureen Fassan</Item>
          <Item>Abbie Binyon</Item>
        </Section>
      </SearchAutocomplete>
    </div>
  );
}
