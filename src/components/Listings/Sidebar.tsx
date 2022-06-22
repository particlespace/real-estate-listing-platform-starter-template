import React, {
    useCallback, useMemo, useState,
} from 'react';
import {
    useStyles
} from './styles';
import { SimpleGrid } from '@mantine/core';

function Demo() {
    return (
        <SimpleGrid cols={3} spacing="sm">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
        </SimpleGrid>
    )
}
