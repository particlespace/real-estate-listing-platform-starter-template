import React, { useState } from 'react';
import { Anchor, Text as MantineText, createStyles, Footer as MantineFooter, Group, ActionIcon, Container, Burger } from '@mantine/core';

export default function Footer() {
    return (
        <MantineFooter
        height="md"
        fixed
        sx={{
            backgroundColor: '#f4f6f9',
            borderTop: 'none',
        }}
        >
        <Container size="xl">
            <MantineText color="dimmed" size="sm">
            Powered with ♥ by <Anchor variant="link" size="sm" href="http://particlespace.com">Particle Space</Anchor>
            </MantineText>
        </Container>
        </MantineFooter>
    );
}
