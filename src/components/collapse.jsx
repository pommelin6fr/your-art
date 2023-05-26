import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const CollapseComponent = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.StrictMode>
      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
        { title }
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            { content }
          </CardBody>
        </Card>
      </Collapse>
    </React.StrictMode>
  );
}

export default CollapseComponent