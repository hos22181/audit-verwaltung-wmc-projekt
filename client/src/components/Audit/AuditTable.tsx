import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  createAudit,
  deleteAudit,
  editAudit,
  fetchAudits,
} from "../../api/audit";
import AuditRow from "./AuditRow";
import ConfirmationModal from "./ConfirmationModal";
import CreateAuditModal from "./CreateAuditModal";
import EditAuditModal from "./EditAuditModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaginatedDocs } from "../../lib/types";
import { Audit } from "../../payload-types";

const AuditTable: React.FC = () => {
  const toast = useToast();
  const { isPending, error, data, refetch } = useQuery<PaginatedDocs<Audit>>({
    queryKey: ["audits"],
    queryFn: fetchAudits,
  });

  const createMutation = useMutation({
    mutationFn: (vars: any) => createAudit(vars.newAudit),
    onSuccess: () => {
      setCreateModalOpen(false);
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (vars: any) => deleteAudit(vars.id),
    onSuccess: () => refetch(),
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [auditDeleteId, setAuditDeleteId] = useState<string | null>(null);
  const [selectedAudit, setSelectedAudit] = useState(null);

  const handleDelete = (auditId: string) => {
    deleteMutation.mutate({ id: auditId });
  };

  const handleCreate = (newAudit: Audit) => {
    createMutation.mutate({ newAudit });
  };

  const handleConfirmView = async (id: string) => {
    setAuditDeleteId(id);
  };

  const handleViewModalOpen = (audit: any) => {
    setSelectedAudit(audit);
  };

  return (
    <Flex
      direction={"column"}
      px={16}
      justifyContent="center"
      alignItems="center"
      w="100%"
      marginTop={"20px"}
    >
      <Button onClick={() => setCreateModalOpen(true)} colorScheme="blue" marginTop={"10px"} marginBottom={"10px"}>
        Create Audit
      </Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Date</Th>
              <Th>Date Count</Th>
              <Th>Lead Auditor ID</Th>
              <Th>Lead Auditee ID</Th>
              <Th>Status</Th>
              <Th>Place</Th>
              <Th>Topic</Th>
              <Th>Type</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isPending ? (
              <tr>
                <td colSpan={9}>Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={9}>Error: {error.message}</td>
              </tr>
            ) : (
              data &&
              data.docs.length > 0 &&
              data.docs.map((audit, index: number) => (
                <AuditRow
                  key={index}
                  audit={audit}
                  onDelete={handleConfirmView}
                  onView={handleViewModalOpen}
                />
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <CreateAuditModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />
      {selectedAudit && (
        <EditAuditModal
          isOpen={selectedAudit !== null}
          onClose={() => setSelectedAudit(null)}
          audit={selectedAudit!}
          onSuccess={refetch}
        />
      )}
      <ConfirmationModal
        isOpen={auditDeleteId !== null}
        onClose={() => setAuditDeleteId(null)}
        auditId={auditDeleteId!}
        onDelete={handleDelete}
      />
    </Flex>
  );
};

export default AuditTable;
