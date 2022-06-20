import React, { useState } from 'react';
import { createStyles, Header as MantineHeader, Group, ActionIcon, Container, Burger } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { BrandTwitter, BrandYoutube, BrandInstagram } from 'tabler-icons-react';
import { Logo } from '../Logo/Logo';
import { useStyles } from './styles';


export interface HeaderProps {
  links: { link: string; label: string }[];
}

export function Header({ links }: HeaderProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <MantineHeader height={56} mb={120}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size="sm"
          className={classes.burger}
        />
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <Logo />

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </MantineHeader>
  );
}
