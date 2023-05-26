import React, { useState } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';

const CollapseComponent = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.StrictMode>
      <div onClick={toggle}>
        { title }
      </div>
      <hr className="separator"/>
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