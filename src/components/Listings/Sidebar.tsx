import React, {
    useCallback, useMemo, useState,
} from 'react';
import {
    useStyles
} from './styles';
import { SimpleGrid, Container } from '@mantine/core';
import { Listing } from './Listing/Listing';
interface SidebarProps {

}
export function Sidebar() {
    return (
        <Container>
            <SimpleGrid cols={2} spacing="lg">
                <div><Listing/></div>
                <div><Listing/></div>
                <div><Listing/></div>
                <div><Listing/></div>
                <div><Listing/></div>
            </SimpleGrid>
        </Container>
    )
}
