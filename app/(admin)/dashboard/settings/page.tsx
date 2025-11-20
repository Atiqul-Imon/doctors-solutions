'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and profile settings</p>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-bold font-display">Profile Settings</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Profile settings will be available in a future update.
        </p>
      </Card>
    </div>
  );
}

