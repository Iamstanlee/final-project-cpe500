import { Card, CardContent, CardHeader } from '@/card';
import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  additional_info?: string;
}

export default function InfoCard({ title, value, additional_info, icon }: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm">{title}</p>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-medium">{value}</div>
        <p className="text-xs text-muted-foreground">{additional_info}</p>
      </CardContent>
    </Card>
  );
}
