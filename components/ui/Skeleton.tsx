import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  height?: string;
  width?: string;
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  lines = 1,
  height,
  width,
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]';

  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-lg p-4',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseStyles, variants.text)}
            style={{
              width: i === lines - 1 ? '80%' : width || '100%',
              height: height || '1rem',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={{
        width: width || (variant === 'circular' ? '40px' : '100%'),
        height: height || (variant === 'circular' ? '40px' : '100px'),
      }}
    />
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <Skeleton variant="text" height="24px" width="60%" />
      <Skeleton variant="text" lines={3} />
      <div className="flex gap-2">
        <Skeleton height="40px" width="100px" />
        <Skeleton height="40px" width="100px" />
      </div>
    </div>
  );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr className="border-b border-gray-200">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton height="20px" />
        </td>
      ))}
    </tr>
  );
}

// List Item Skeleton
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <Skeleton variant="circular" width="48px" height="48px" />
      <div className="flex-1">
        <Skeleton height="20px" width="40%" className="mb-2" />
        <Skeleton height="16px" width="60%" />
      </div>
    </div>
  );
}

// Appointment Card Skeleton
export function AppointmentSkeleton() {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton width="120px" height="20px" />
        <Skeleton width="80px" height="24px" />
      </div>
      <Skeleton variant="text" lines={2} />
      <div className="flex gap-2">
        <Skeleton height="36px" width="80px" />
        <Skeleton height="36px" width="80px" />
      </div>
    </div>
  );
}

// Patient Queue Skeleton
export function QueueSkeleton() {
  return (
    <div className="space-y-4">
      <CardSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton height="24px" width="150px" className="mb-3" />
            <AppointmentSkeleton />
            <AppointmentSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard Stats Skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton variant="circular" width="48px" height="48px" />
            <Skeleton width="60px" height="32px" />
          </div>
          <Skeleton height="20px" width="100px" />
        </div>
      ))}
    </div>
  );
}
