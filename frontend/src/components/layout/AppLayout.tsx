import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  AppShell, 
  Burger, 
  Group, 
  NavLink, 
  Stack, 
  Text, 
  Avatar,
  UnstyledButton,
  Box,
  Divider,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Receipt,
} from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Nouveau Reçu', href: '/receipt/new', icon: FileText },
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure();
  const theme = useMantineTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="border-b border-gray-200 bg-white">
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <img 
                  src="/cat-logo.png" 
                  alt="Logo de l'école" 
                  className="w-24 h-24 object-contain"
                />
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <Text fw={700} size="lg" className="text-gray-800">RecuPro</Text>
              </div>
            </div>
          </Group>
          <Text fw={500} size="sm" c="dimmed" className="hidden sm:block">
            {navigation.find((n) => n.href === location.pathname)?.name || 'Dashboard'}
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className="bg-gray-50 border-r border-gray-200">
        <AppShell.Section grow>
          <Stack gap="xs">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  component={Link}
                  to={item.href}
                  label={item.name}
                  leftSection={<item.icon size={18} />}
                  active={isActive}
                  onClick={close}
                  className={`rounded-lg transition-all ${
                    isActive 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  styles={{
                    root: {
                      '&[dataActive]': {
                        backgroundColor: theme.colors.blue[6],
                        color: 'white',
                      },
                    },
                  }}
                />
              );
            })}
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Divider my="sm" />
          <Box className="p-2 rounded-lg bg-white border border-gray-200 mb-2">
            <Group>
              <Avatar color="blue" radius="xl" size="sm">
                {user?.username.charAt(0).toUpperCase()}
              </Avatar>
              <div className="flex-1 min-w-0">
                <Text size="sm" fw={500} truncate>
                  {user?.username}
                </Text>
                <Text size="xs" c="dimmed">
                  Administrateur
                </Text>
              </div>
            </Group>
          </Box>
          <UnstyledButton
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            <Text size="sm">Déconnexion</Text>
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className="bg-gray-50">
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
