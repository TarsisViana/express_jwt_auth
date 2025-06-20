import styled from "styled-components";

const Input = styled.input`
  display:block;

  height: 2rem;
  width: 100%;
  margin: auto;
  margin-top: .2rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  
  
  background-color: #f4f5f6;
  border-radius: 10px;
  border: 0;
`
const Label = styled.label`
  display: flex;
  flex-direction: column;

`
// eslint-disable-next-line react/prop-types
export default function InputField({ type, name, children }) {
  return (
    <Label>
      {children}
      <Input
        type={type}
        name={name}
        required
      />
    </Label>
  );
}