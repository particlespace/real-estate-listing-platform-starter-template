import {SetStateAction, useCallback} from 'react';
import {
  Modal,
  Stack,
  Title,
  Skeleton
} from '@mantine/core';
import { ResultContent } from '../ResultContent/ResultContent';
import { IPropertyData } from "../Sidebar/Sidebar";
import PropertyDetailSkeleton from "./PropertyDetailSkeleton";
import { mockPropertyData } from "../../App";

interface PropertyDetailViewProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  propertyData: IPropertyData;
  setPropertyData?: SetStateAction<any>
  isLoading?: SetStateAction<boolean>;
}

export default function PropertyDetailView({
  isOpen,
  setOpen,
  propertyData,
  isLoading,
  setPropertyData,
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
    setPropertyData(mockPropertyData)
  }, [
    setOpen,
    setPropertyData
  ]);

  const propertyAddress = `${address}, ${city}, ${state}, ${zipcode}`;

  return (
    <Modal
      opened={isOpen}
      onClose={handleModalClose}
      title={(
        <Title order={2}>
          {
            propertyAddress !== ' , , , '
              ? propertyAddress
              : (
                <Skeleton
                  width={450}
                  height={70}
                  visible={true}
                />
              )
          }
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
          propertyData !== null && !isLoading
            ? (
              <ResultContent
                data={propertyData}
                listingDetails={{
                  salePrice: propertyData.estimate_list_sell_price,
                  recentActivity: '🔥🔥🔥',
                  views: 1234432,
                }}
              />
              )
            : (<PropertyDetailSkeleton />)
        }
      </Stack>
    </Modal>
  );
}
