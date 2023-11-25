import React from 'react';
import { useDisclosure, useCounter } from '@mantine/hooks';
import { Modal, Button, Text, Group } from '@mantine/core';

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);

  const modalContent = (
    <>
      <Text>Modal with size auto will fit its content</Text>

      <Group mt="xl">
        <Button variant="outline">
          Add badge
        </Button>
        <Button variant="outline" >
          Remove badge
        </Button>
      </Group>
    </>
  );

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="Modal size auto">
        {modalContent}
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </>
  );
}

export default Demo;
