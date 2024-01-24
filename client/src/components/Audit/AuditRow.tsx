import { Tr, Td, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { formatDate } from '../../lib/utils';
import { Audit } from '../../payload-types';

interface AuditProps {
  audit: Audit;
  onDelete: (id: string) => void;
  onView: (audit: Audit) => void;
}

const AuditRow: React.FC<AuditProps> = ({ audit, onDelete, onView }) => {
  return (
    <Tr>
      <Td>{audit.id}</Td>
      <Td>{formatDate(audit.date)}</Td>
      <Td>{audit.dateCount}</Td>
      <Td>{audit.leadAuditorId}</Td>
      <Td>{audit.leadAuditeeId}</Td>
      <Td>{audit.status}</Td>
      <Td>{audit.place}</Td>
      <Td>{audit.topic}</Td>
      <Td>{audit.type}</Td>
      <Td>
        <Flex gap="5">
          <Button onClick={() => onDelete(audit.id)} colorScheme="red">
            Delete
          </Button>

          <Button onClick={() => onView(audit)} colorScheme="green">
            Edit
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};

export default AuditRow;
