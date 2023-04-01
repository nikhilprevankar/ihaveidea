import * as CryptoJS from "crypto-js";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { allValuesEmail2, allValuesExport1 } from "../../constants/Constants";
import { useIdleTimer } from "react-idle-timer";

function Test() {
  const [valueEmail, setValueEmail] = useState("abc,");
  const [valueKey, setValueKey] = useState("xyz,");
  const [_key, setKey] = useState("");

  const handleOnIdle = () => {
    clearAll();
  };

  const idle = useIdleTimer({
    timeout: 1000 * 60 * 10,
    onIdle: handleOnIdle,
    debounce: 1000,
  });

  const encryptAES = (text) => {
    const key = CryptoJS.enc.Utf8.parse(_key);
    const iv1 = CryptoJS.enc.Utf8.parse(
      _key + "zkjxnajksnkadskashdkashbdkbkabsd"
    );
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      keySize: 16,
      iv: iv1,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted + "";
  };
  // const decryptAES = (string) => {
  //   const key = CryptoJS.enc.Utf8.parse(_key);
  //   const iv1 = CryptoJS.enc.Utf8.parse(
  //     _key + "zkjxnajksnkadskashdkashbdkbkabsd"
  //   );
  //   const plainText = CryptoJS.AES.decrypt(string, key, {
  //     keySize: 16,
  //     iv: iv1,
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });

  //   return plainText.toString(CryptoJS.enc.Utf8);
  // };

  const [displayValueEmail_1, setDisplayValueEmail_1] = useState("");
  const [displayValueEmail_2, setDisplayValueEmail_2] = useState("");

  const onClickOfEnterBtn = () => {
    if (_key) {
      setDisplayValueEmail_1(getValue(valueEmail, allValuesExport1));
      setDisplayValueEmail_2(getValue(valueKey, allValuesEmail2));
    }
  };

  const getValue = (value = "", data = {}) => {
    let elementValue = "";
    const enteredValue = value;
    if (enteredValue) {
      let values = enteredValue.split(",");

      if (values && values.length > 2 && values[2]) {
        const myNo = values[1];
        const myValue = values[2];
        for (let index = 0; index < myValue.length; index++) {
          const value = encryptAES(myValue[index], _key);
          elementValue += data[value]?.[myNo] || myValue[index];
        }
      }
    }
    return elementValue;
  };

  const clearAll = () => {
    setValueEmail("abc@gmail.com,");
    setValueKey("xyz@gmail.com,");
    setDisplayValueEmail_1("");
    setDisplayValueEmail_2("");
    setKey("");
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>key</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter"
                  value={_key}
                  onChange={(e) => setKey("" + e.target.value)}
                />
                <Form.Label>Question 1</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter email"
                  value={valueEmail}
                  onChange={(e) => setValueEmail(e.target.value)}
                />
                <Form.Label>Question 2</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter Key"
                  value={valueKey}
                  onChange={(e) => setValueKey(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Row>
            <Button variant="primary" type="button" onClick={() => clearAll()}>
              Clear
            </Button>
          </Row>

          <Row>
            <Button variant="primary" type="button" onClick={onClickOfEnterBtn}>
              Enter
            </Button>
          </Row>
        </Row>
      </Container>

      <Container>
        {displayValueEmail_1 ? (
          <Row>
            <Form.Label>1 Output</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter email"
              value={displayValueEmail_1}
            />
          </Row>
        ) : (
          <></>
        )}
        {displayValueEmail_2 ? (
          <Row>
            <Form.Label>2 Output</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter email"
              value={displayValueEmail_2}
            />
          </Row>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}

export default Test;
