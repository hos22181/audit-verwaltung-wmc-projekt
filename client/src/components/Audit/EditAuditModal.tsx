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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Text,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Audit, Question } from '../../payload-types';
import { useMutation } from '@tanstack/react-query';
import { editAudit } from '../../api/audit';

interface EditAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  audit: Audit;
  onSuccess: () => void;
}

const EditAuditModal: React.FC<EditAuditModalProps> = ({ isOpen, onClose, audit, onSuccess }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();
  const editMutation = useMutation({
    mutationFn: (vars: any) => editAudit(vars.audit),
    onSettled: (data: any, error) => {
      console.log("Data", data)
      console.log("errors", error)
      if (data.errors) {
        const errs: Record<string, string> = data.errors[0].data.reduce((result: any, { field, message }: { field: string; message: string; }) => {
          result[field] = message;
          return result;
        }, {});
        console.log("errs", errs)
        setErrors(errs)
        toast({
          title: 'Error',
          description: data.errors[0].message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return;
      }

      onSuccess();
      onClose();
    },
    /*onSuccess: () => {
      onSuccess();
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }*/
  })

  const [newAudit, setNewAudit] = useState({
    date: audit.date ?? '',
    dateCount: audit.dateCount ?? 0,
    leadAuditorId: audit.leadAuditorId,
    leadAuditeeId: audit.leadAuditeeId,
    status: audit.status,
    place: audit.place,
    topic: audit.topic,
    type: audit.type,
  } as Audit);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAudit((prevAudit) => ({ ...prevAudit, [name]: value }));
  };

  const handleSubmit = () => {
    editMutation.mutate({ audit: { ...newAudit, id: audit.id } })
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Audit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.date}>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={newAudit.date} onChange={handleInputChange} />
            <FormErrorMessage>{errors['date']}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.dateCount}>
            <FormLabel>Date Count</FormLabel>
            <Input type="number" name="dateCount" value={newAudit.dateCount} onChange={handleInputChange} />
            <FormErrorMessage>{errors['dateCount']}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.leadAuditorId}>
            <FormLabel>Lead Auditor ID</FormLabel>
            <Input type="number" name="leadAuditorId" value={newAudit.leadAuditorId} onChange={handleInputChange} />
            <FormErrorMessage>{errors['leadAuditorId']}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.leadAuditeeId}>
            <FormLabel>Lead Auditee ID</FormLabel>
            <Input type="number" name="leadAuditeeId" value={newAudit.leadAuditeeId} onChange={handleInputChange} />
            <FormErrorMessage>{errors['leadAuditeeId']}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={newAudit.status} onChange={handleInputChange} />
            <FormErrorMessage>{errors.status}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.place}>
            <FormLabel>Place</FormLabel>
            <Input type="text" name="place" value={newAudit.place} onChange={handleInputChange} />
            <FormErrorMessage>{errors['place']}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.topic}>
            <FormLabel>Topic</FormLabel>
            <Input type="text" name="topic" value={newAudit.topic} onChange={handleInputChange} />
            <FormErrorMessage>{errors['topic']}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.type}>
            <FormLabel>Type</FormLabel>
            <Input type="text" name="type" value={newAudit.type} onChange={handleInputChange} />
            <FormErrorMessage>{errors['type']}</FormErrorMessage>
          </FormControl>

          {audit.questions && (
            <Flex gap="2" direction="column" mt={3}>
              <Text>Questions</Text>
              <Select>
                {(audit.questions as Question[]).map((question, index) => (
                  <option value={question.id} key={index}>{question.id}</option>
                ))}
              </Select>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>

          <Button onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAuditModal;
