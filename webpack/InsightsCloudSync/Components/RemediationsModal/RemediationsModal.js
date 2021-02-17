import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';

const RemediationsModal = props => {
  const [show, setShow] = React.useState(false);
  const closeModal = () => setShow(false);
  return (
    <React.Fragment>
      <Button variant="primary" onClick={() => setShow(true)}>
        {__('Remediate')}
      </Button>{' '}
      <Modal
        variant={ModalVariant.large}
        title="Large modal header"
        isOpen={show}
        onClose={closeModal}
        appendTo={document.body}
        actions={[
          <Button key="confirm" variant="primary" onClick={closeModal}>
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={closeModal}>
            Cancel
          </Button>,
        ]}
      >
        <p>Hello World</p>
      </Modal>
    </React.Fragment>
  );
};

export default RemediationsModal;
