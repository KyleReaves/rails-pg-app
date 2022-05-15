import * as React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export interface Address {
  id: number;
  streetAddress: string;
  municipality: string;
  state: string;
  zipCode: string;
}

let blankAddress: Address = {
  id: 0,
  streetAddress: "",
  municipality: "",
  state: "",
  zipCode: "",
};

interface GeocoderFormProps {
  onSave: (address: Address) => void;
}

export default function GeocoderForm({ onSave }: GeocoderFormProps) {
  const [address, setAddress] = React.useState(blankAddress);

  return (
    <>
      {address.zipCode !== "" && address.zipCode.length === 5 ? (
        <div>{JSON.stringify(address.zipCode)}</div>
      ) : (
        <br />
      )}
      <Form>
        <Form.Group className="mb-3" controlId="geocoderFrom.ControlInput1">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="street address"
            value={address.streetAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress({ ...address, streetAddress: e.target.value })
            }
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="geocoderFrom.ControlInput2">
            <Form.Label>City or municipality</Form.Label>
            <Form.Control
              type="text"
              placeholder="city"
              value={address.municipality}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress({ ...address, municipality: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="geocoderFrom.ControlInput3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="state"
              value={address.state}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress({ ...address, state: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="geocoderFrom.ControlInput4">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              type="text"
              placeholder="zip"
              value={address.zipCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress({ ...address, zipCode: e.target.value });
              }}
            />
          </Form.Group>
        </Row>
      </Form>
      <Button
        size="lg"
        onClick={() => [
          onSave(address),
          blankAddress.id++,
          setAddress(blankAddress),
        ]}
      >
        {address.zipCode !== "" && address.zipCode.length === 5 ? (
          <>Geocode Zipcode</>
        ) : (
          <>Geocode Address</>
        )}
      </Button>{" "}
    </>
  );
}
