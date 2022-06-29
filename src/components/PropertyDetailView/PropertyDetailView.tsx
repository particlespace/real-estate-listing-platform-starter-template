import {
  useEffect,
  useCallback
} from 'react';
import {
  Modal,
  Stack,
  Title
} from '@mantine/core';
import {
  ResultContent
} from '../ResultContent/ResultContent';
import { IPropertyData } from "../Sidebar/Sidebar";

interface PropertyDetailViewProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  propertyData: IPropertyData;
}

export default function PropertyDetailView({
  isOpen,
  setOpen,
  propertyData,
}: PropertyDetailViewProps) {
    const {
      address: {
        address,
        city,
        state,
        zipcode
      }
    } = propertyData;

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, [isOpen]);

  return (
    <Modal
      opened={isOpen}
      onClose={handleModalClose}
      title={(
        <Title order={2}>
          {`${address}, ${city}, ${state}, ${zipcode}`}
        </Title>
      )}
      size="xl"
      styles={(theme) => ({
        modal: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Stack spacing={4}>
        {
          propertyData !== null && (
            <ResultContent
              data={propertyData}
              listingDetails={{
                salePrice: propertyData.estimate_list_sell_price,
                recentActivity: '🔥🔥🔥',
                views: 129048,
              }}
            />
          )
        }
      </Stack>
    </Modal>
  );
}
