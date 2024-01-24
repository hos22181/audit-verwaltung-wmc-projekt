import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Audit } from '../../payload-types';

interface CreateAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newAudit: Audit) => void; // Adjust the type as per your data structure
}

const CreateAuditModal: React.FC<CreateAuditModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [newAudit, setNewAudit] = useState({
    date: '',
    dateCount: 0,
    leadAuditorId: 0,
    leadAuditeeId: 0,
    status: '',
    place: '',
    topic: '',
    type: '',
  } as Audit);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAudit((prevAudit) => ({ ...prevAudit, [name]: value }));
  };

  const handleSubmit = () => {
    onCreate(newAudit);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Audit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={newAudit.date} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Date Count</FormLabel>
            <Input type="number" name="dateCount" value={newAudit.dateCount} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Lead Auditor ID</FormLabel>
            <Input type="number" name="leadAuditorId" value={newAudit.leadAuditorId} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Lead Auditee ID</FormLabel>
            <Input type="number" name="leadAuditeeId" value={newAudit.leadAuditeeId} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={newAudit.status} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Place</FormLabel>
            <Input type="text" name="place" value={newAudit.place} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Topic</FormLabel>
            <Input type="text" name="topic" value={newAudit.topic} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Input type="text" name="type" value={newAudit.type} onChange={handleInputChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateAuditModal;
