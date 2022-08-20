import { Group, Progress, Stack } from '@mantine/core';
import { useMemo } from 'react';
import { PasswordRequirement } from './PasswordRequirement';

const requirements = [
  { re: /(?=.*?[0-9])/, label: 'Includes number' },
  { re: /(?=.*?[a-z])/, label: 'Includes lowercase letter' },
  { re: /(?=.*?[A-Z])/, label: 'Includes uppercase letter' },
  { re: /(?=.*?[#?!@$%^&*-])/, label: 'Includes special symbol' },
  { re: /.{8,}/, label: 'Has at least 8 characters' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export const PasswordStrength = ({ value }: { value: string }) => {
  const _value = useMemo(() => value || '', [value]);

  const strength = getStrength(_value);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(_value)} />
  ));

  const bars = Array(5)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={_value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 5) * 100 ? 100 : 0}
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <Stack spacing={0}>
      <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      {checks}
    </Stack>
  );
};
