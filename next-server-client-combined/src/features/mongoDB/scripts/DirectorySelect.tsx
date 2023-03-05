import React, { useState, useEffect } from "react";
import { getDirectories, getFiles } from "./util";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const DirectorySelect = ({ processFile }: any) => {
  const [directory, setDirectory] = useState("");
  const [directoryList, setDirectoryList] = useState([]);
  const [processSubDirectories, setProcessSubDirectories] = useState(false);
  const filePath = "/features/mongoDB/files";

  useEffect(() => {
    const assignDirectories = async () => {
      const data = await getDirectories(filePath);
      setDirectoryList(data.directories);
    };
    assignDirectories();
  }, []);

  const { Group, Label, Control } = Form;
  return (
    <Container>
      <Form>
        <Group as={Row} controlId="directorySelect">
          <Label column sm={2}>
            Directory:
          </Label>
          <Col sm={10}>
            <Control as="select" value={directory} onChange={(e) => setDirectory(e.target.value)}>
              <option value="">Select a directory</option>
              {directoryList.length > 0 &&
                directoryList.map((dir) => (
                  <option key={dir} value={dir}>
                    {dir}
                  </option>
                ))}
            </Control>
          </Col>
        </Group>

        <Group as={Row} controlId="processSubDirectories">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check type="checkbox" label="Process Sub-Directories" checked={processSubDirectories} onChange={(e) => setProcessSubDirectories(e.target.checked)} />
          </Col>
        </Group>

        <Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="button" onClick={() => processFile(filePath + "/" + directory, processSubDirectories)}>
              Run script
            </Button>
          </Col>
        </Group>
      </Form>
    </Container>
  );
};

export default DirectorySelect;
