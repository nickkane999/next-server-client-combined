import React, { useState, useEffect } from "react";
import { getDirectories, getFiles } from "./util";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ScriptSelect = ({ processFile }: any) => {
  const [directory, setDirectory] = useState("");
  const [file, setFile] = useState("");
  const [directoryList, setDirectoryList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const filePath = "/features/mongoDB/files";

  useEffect(() => {
    const assignDirectories = async () => {
      const data = await getDirectories(filePath);
      setDirectoryList(data.directories);
    };
    assignDirectories();
  }, []);

  useEffect(() => {
    const assignFiles = async () => {
      if (directory) {
        const data = await getFiles(filePath, directory);
        setFileList(data.files);
      }
    };
    assignFiles();
  }, [directory]);

  return (
    <Container>
      <Form>
        <Form.Group as={Row} controlId="directorySelect">
          <Form.Label column sm={2}>
            Directory:
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="select" value={directory} onChange={(e) => setDirectory(e.target.value)}>
              <option value="">Select a directory</option>
              {directoryList.length > 0 &&
                directoryList.map((dir) => (
                  <option key={dir} value={dir}>
                    {dir}
                  </option>
                ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="fileSelect">
          <Form.Label column sm={2}>
            File:
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="select" value={file} onChange={(e) => setFile(e.target.value)}>
              <option value="">Select a file</option>
              {fileList.length > 0 &&
                fileList.map((file) => (
                  <option key={file} value={file}>
                    {file}
                  </option>
                ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="button" onClick={() => processFile(filePath + "/" + directory + "/" + file)}>
              Run script
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ScriptSelect;
